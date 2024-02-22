import pandas as pd
from googletrans import Translator
import re
from fastapi import HTTPException
from src.middleware.logger import logger
from datetime import datetime


connection_params = {

}

engine = f"postgresql://{connection_params['user']}:{connection_params['password']}@{connection_params['host']}:{connection_params['port']}/{connection_params['database']}"
current_dateTime = datetime.now()

def getDataFromDB(date):
    tmr = (pd.Timestamp(date) + pd.DateOffset(days=1)).strftime('%Y-%m-%d')
    try:
        table_name = "initial_data"
        query = f"SELECT * FROM {table_name} WHERE post_created_at between '{date}' and '{tmr}'"
        post_df = pd.read_sql(query, engine)

        table_name = "language"
        query = f"SELECT * FROM {table_name}"
        language_df = pd.read_sql(query, engine)
    except Exception as e:
        logger.error("Connection error:", e)

    return post_df, language_df

def getLocation():
    try:
        table_name = "location"
        query = f"SELECT * FROM {table_name}"
        location_df = pd.read_sql(query, engine)
    except Exception as e:
        logger.error("Connection error:", e)

    return location_df


def cleansingContext(caption: str):
    escaped_words = ['Maya', 'Wat Gate Garam', 'Chiang Mai Grand Canyon', 'Doi Inthanon', 'Mae Taeng Elephant Park', 'Wat Phra Singh', 'Wat Umong', 'Three Kings Monument', 'Wat Chiang Man', 'Tha Phae Gate', 'Chiang Mai Night Bazaar', 'Chiang Mai Night Safari']
    pattern = re.compile(
                        r'(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*|['
                        r'\d+'
                        u"\U0001F600-\U0001F64F"  # emoticons
                        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
                        u"\U0001F680-\U0001F6FF"  # transport & map symbols
                        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
                        u"\U00002702-\U000027B0"   # Miscellaneous Symbols
                        u"\U0001f926-\U0001f937"   # Additional Emojis
                        u"\U00010000-\U0010ffff"   # Supplementary Planes
                        u"\u2640-\u2642"         # Gender Symbols
                        u"\u2600-\u2B55"         # Weather Symbols
                        u"\u200d"                # Zero Width Joiner
                        u"\u23cf"                # Eject Button
                        u"\u23e9"                # Reverse Button
                        u"\u231a"                # Watch
                        u"\ufe0f"                # dingbats
                        u"\u3030"                # Wavy Dash
                           "]+"
                        , flags=re.UNICODE)

    cleaned_caption = pattern.sub(r'', caption) if caption and caption.strip() else None

    words = cleaned_caption.split()  # Split the sentence into words
    words = ['' if word in escaped_words else word for word in words]
    return ' '.join(words)

def langDetector(caption: str):
    translator = Translator()
    try:
        langCap = str(translator.detect(caption).lang) if caption and isinstance(caption, str) else None

    except Exception as e:
        langCap = None
        logger.error(f"Error detected 'caption': {e}, {caption}")

    return langCap


def AnalyticData(date):
    logger.info('call getting data from db')
    original_df, language_df = getDataFromDB(date)
    if original_df.empty:
        raise HTTPException(status_code=404, detail="Data not found")
    logger.info('end getting data from db')
    nan_value = float("NaN")
    original_df.replace("", nan_value, inplace=True)
    original_df.dropna(subset = ["caption"], inplace=True)

    logger.info('call cleaning data')
    original_df['cleaned_caption'] = original_df['caption'].apply(cleansingContext)
    logger.info('end cleaning data')

    cleaned_data = original_df[['location_id', 'cleaned_caption', 'post_created_at', 'post_taken_at']]
    cleaned_data = cleaned_data.fillna('')

    logger.info('language analyze start')
    cleaned_data['used_language'] = cleaned_data['cleaned_caption'].apply(langDetector)
    logger.info('language analyze end')

    modified_df = cleaned_data[['location_id', 'used_language', 'cleaned_caption', 'post_created_at', 'post_taken_at']]
    modified_df = modified_df.fillna('')
    modified_df = modified_df[(modified_df['cleaned_caption'] != '')]

    merged_data = pd.merge(modified_df, language_df, how='left', left_on='used_language', right_on='iso_code')
    merged_data = merged_data.drop('used_language', axis=1)
    merged_data = merged_data.drop('language_id', axis=1)

    merged_data = merged_data.dropna(subset=['cleaned_caption'])
    merged_data['created_at'] = pd.Timestamp.now()
    merged_data['created_by'] = 'System'
    merged_data['updated_at'] = pd.Timestamp.now()
    merged_data['updated_by'] = 'System'

    try:
        merged_data.to_sql('post_language_detected', con=engine, if_exists='append', index=False)
        logger.info('write into db success')
        logger.info(f"End calling analytic service at {current_dateTime}")

        return "Analyzed data success!"
    except Exception as e:
        logger.error("Write data into db error:", e)
        raise HTTPException(status_code=400, detail="Cannot analyze data. Please try again.")
