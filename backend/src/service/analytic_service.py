import pandas as pd
import json
from googletrans import Translator
import re

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


def getDataFromDB(table):
    f = open('/content/dataset.json', encoding="utf-8")

    data = json.load(f)

    posts = []
    for i in data[0]['latestPosts']:
        taken_at = i['taken_at']
        user_id = i['user']['id']
        username = i['user']['username']
        full_name = i['user']['full_name']

        if i['caption'] != None:
            caption = i['caption'].get("text")
            created_at = i['caption'].get("created_at")
        posts.append([taken_at, user_id, username, full_name, caption, created_at])

    df = pd.DataFrame(posts)

    df.to_csv('posts.csv')
    print(df)
    f.close()

def cleansingContext(name: str, bio: str, caption: str):
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
    cleaned_name = emoji_pattern.sub(r'', name) if name and name.strip() else None
    cleaned_bio = emoji_pattern.sub(r'', bio) if bio and bio.strip() else None
    cleaned_caption = emoji_pattern.sub(r'', caption) if caption and caption.strip() else None
    return cleaned_name, cleaned_bio, cleaned_caption


def langDetector(name: str, bio: str, caption: str):
    translator = Translator()
    try:
        langName = str(translator.translate(name).src) if name and isinstance(name, str) else None

    except Exception as e:
        print(f"Error translating 'name': {e}, {name}")
        langName = None

    try:
        langBio = str(translator.translate(bio).src) if bio and isinstance(bio, str) else None

    except Exception as e:
        print(f"Error translating 'bio': {e}, {bio}")
        langBio = None

    try:
        langCap = str(translator.translate(caption).src) if caption and isinstance(caption, str) else None

    except Exception as e:
        print(f"Error translating 'caption': {e}, {caption}")
        langCap = None

    return langName, langBio, langCap