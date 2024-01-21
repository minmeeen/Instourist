import pandas as pd
import json
from googletrans import Translator
import re
import psycopg2

DB_PATH = 'jdbc:postgresql://localhost:5432/postgres'
DB_NAME = "instourist"
DB_USERNAME = "postgres"
DB_PASSWORD = "postgres"
def getDataFromDB():
    conn = None
    try:
        print('Connecting…')
        conn = psycopg2.connect(
                host=os.environ[DB_PATH],
                database=os.environDB_NAME[DB_NAME],
                user=os.environ[DB_USERNAME],
                password=os.environ[DB_PASSWORD])
    
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

    print('All good, Connection successful!')
    return conn
        

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
    original_df = pd.read_csv(csv_path)
    original_df = original_df.fillna('')
    print(original_df)

    cleaned_data = original_df.apply(lambda row: cleansingContext(row['Name'], row['Bio'], row['Caption']), axis=1, result_type='expand')
    
    cleaned_data.columns = ['cleaned_name', 'cleaned_bio', 'cleaned_caption']
    cleaned_data = cleaned_data.fillna('')
    print(cleaned_data)

    modified_df = cleaned_data.apply(lambda row: langDetector(row['cleaned_name'], row['cleaned_bio'], row['cleaned_caption']), axis=1, result_type='expand')
    modified_df.columns = ['langName', 'langBio', 'langCap']

    modified_df = modified_df.fillna('')
    print(modified_df)

