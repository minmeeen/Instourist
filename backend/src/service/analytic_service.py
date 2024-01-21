import pandas as pd
from googletrans import Translator
import re
import sql 
from db_connect import Database
from datetime import date

today = date.today()

connection_params = {
    "host": "localhost",
    "database": "instourist",
    "user": "postgres",
    "password": "postgres",
    "port": "5432"
}

engine = f"postgresql://{connection_params['user']}:{connection_params['password']}@{connection_params['host']}:{connection_params['port']}/{connection_params['database']}"

def getDataFromDB():
    try:
        table_name = "initial_data"
        query = f"SELECT * FROM {table_name}"
        post_df = pd.read_sql(query, engine)
    except Exception as e:
        print("Connection error:", e)

    try:
        table_name = "language"
        query = f"SELECT * FROM {table_name}"
        language_df = pd.read_sql(query, engine)
    except Exception as e:
        print("Connection error:", e)

    return post_df, language_df


def cleansingContext(caption: str):
    emoji_pattern = re.compile(r'(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*|['
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
                           "]+", flags=re.UNICODE)
    # cleaned_name = emoji_pattern.sub(r'', name) if name and name.strip() else None
    # cleaned_bio = emoji_pattern.sub(r'', bio) if bio and bio.strip() else None
    cleaned_caption = emoji_pattern.sub(r'', caption) if caption and caption.strip() else None
    return cleaned_caption


def langDetector(caption: str):
    translator = Translator()
    # try:
    #     langName = str(translator.translate(name).src) if name and isinstance(name, str) else None

    # except Exception as e:
    #     print(f"Error translating 'name': {e}, {name}")
    #     langName = None

    # try:
    #     langBio = str(translator.translate(bio).src) if bio and isinstance(bio, str) else None

    # except Exception as e:
    #     print(f"Error translating 'bio': {e}, {bio}")
    #     langBio = None

    try:
        langCap = str(translator.translate(caption).src) if caption and isinstance(caption, str) else None

    except Exception as e:
        print(f"Error translating 'caption': {e}, {caption}")
        langCap = None

    return langCap


def AnalyticData():
    original_df, language_df = getDataFromDB()
    original_df = original_df.fillna('')
    original_df['cleaned_caption'] = original_df['caption'].apply(cleansingContext)

    cleaned_data = original_df[['location_id', 'cleaned_caption', 'post_created_at', 'post_taken_at']]
    cleaned_data = cleaned_data.fillna('')
    cleaned_data['used_language'] = cleaned_data['cleaned_caption'].apply(langDetector)

    modified_df = cleaned_data[['location_id', 'used_language', 'cleaned_caption', 'post_created_at', 'post_taken_at']]
    modified_df = modified_df.fillna('')

    merged_data = pd.merge(modified_df, language_df, how='left', left_on='used_language', right_on='iso_code')
    merged_data = merged_data.drop('used_language', axis=1)
    merged_data = merged_data.drop('language_id', axis=1)

    merged_data = merged_data.dropna(subset=['cleaned_caption'])
    merged_data['created_at'] = pd.Timestamp.now()
    merged_data['created_by'] = 'System'

    try:
        merged_data.to_sql('post_language_detected', con=engine, if_exists='append', index=False)
    except Exception as e:
        print("Write data error:", e)

# AnalyticData()
