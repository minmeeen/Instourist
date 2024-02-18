import pandas as pd
from googletrans import Translator
import re
from datetime import date
import logging


today = date.today()

connection_params = {
    "host": "172-104-62-253.ip.linodeusercontent.com",
    "database": "instourist_db",
    "user": "instourist",
    "password": "e5q6&!E*D0G8v5mAy1",
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
        logging.error("Connection error:", e)

    # return post_df, language_df
    return language_df

def getLocation():
    try:
        table_name = "location"
        query = f"SELECT * FROM {table_name}"
        location_df = pd.read_sql(query, engine)
    except Exception as e:
        logging.error("Connection error:", e)

    return location_df


def cleansingContext(caption: str):
    # df = getLocation()
    # print(df['location_name'])
    # escaped_words = map(re.escape, df['location_name'])
    # escaped_words = map(re.escape, ['Maya', 'Wat Gate Garam', 'Chiang Mai Grand Canyon', 'Doi Inthanon', 'Mae Taeng Elephant Park', 'Wat Phra Singh', 'Wat Umong', 'Three Kings Monument', 'Wat Chiang Man', 'Tha Phae Gate', 'Chiang Mai Night Bazaar', 'Chiang Mai Night Safari'])
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
    # cleaned_name = emoji_pattern.sub(r'', name) if name and name.strip() else None
    # cleaned_bio = emoji_pattern.sub(r'', bio) if bio and bio.strip() else None
    cleaned_caption = pattern.sub(r'', caption) if caption and caption.strip() else None

    words = cleaned_caption.split()  # Split the sentence into words
    words = ['' if word in escaped_words else word for word in words]
    return ' '.join(words)
    # return cleaned_caption


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
        # langCap = str(translator.translate(caption).src) if caption and isinstance(caption, str) else None
        langCap = str(translator.detect(caption).lang) if caption and isinstance(caption, str) else None

    except Exception as e:
        langCap = None
        logging.ERROR(f"Error translating 'caption': {e}, {caption}")

    return langCap


def AnalyticData(original_df):
    logging.info('call getting data from db')
    # original_df, language_df = getDataFromDB()
    language_df = getDataFromDB()
    logging.info('end getting data from db')
    nan_value = float("NaN")
    original_df.replace("", nan_value, inplace=True)
    original_df.dropna(subset = ["caption"], inplace=True)

    logging.info('call cleaning data')
    original_df['cleaned_caption'] = original_df['caption'].apply(cleansingContext)
    logging.info('end cleaning data')

    cleaned_data = original_df[['location_id', 'cleaned_caption', 'post_created_at', 'post_taken_at']]
    cleaned_data = cleaned_data.fillna('')
    logging.info('preprocessing data start')

    logging.info('language analyze start')
    cleaned_data['used_language'] = cleaned_data['cleaned_caption'].apply(langDetector)
    logging.info('language analyze end')

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
        print(merged_data)
        logging.info('write into db success')
    except Exception as e:
        logging.error("Write data into db error:", e)

test_data = [
  {
    "initial_id": 253,
    "user_id": "7357532105",
    "username": "yuefengxin",
    "full_name": "欣悅豐",
    "caption": "晚上真的會冷欸",
    "post_created_at": "2024-01-05 12:47:11.000000",
    "post_taken_at": "2024-01-05 12:47:10.000000",
    "location_id": 12,
    "created_at": "2024-01-21 00:19:52.326722",
    "created_by": "System"
  },
  {
    "initial_id": 3,
    "user_id": "63928922874",
    "username": "thebank1985",
    "full_name": "thebank",
    "caption": "ตัวไหม้เลยฮับ😢",
    "post_created_at": "2024-01-02 15:59:20.000000",
    "post_taken_at": "2024-01-02 15:59:19.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.329195",
    "created_by": "System"
  },
  {
    "initial_id": 4,
    "user_id": "62409295263",
    "username": "spy_rachadakorn",
    "full_name": "🌈会发财💰",
    "caption": "ข่าวดีคือกลับไทยเเล้วข่าวร้ายคือ ig เก่าโดนขโมย😭 #กลับมาวันเเรกก็เที่ยวเลย😘",
    "post_created_at": "2023-10-09 04:13:58.000000",
    "post_taken_at": "2023-10-09 04:13:57.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.342917",
    "created_by": "System"
  },
  {
    "initial_id": 5,
    "user_id": "197726361",
    "username": "_deboraviteri",
    "full_name": "",
    "caption": "ข่าวดีคือกลับไทยเเล้วข่าวร้ายคือ ig เก่าโดนขโมย😭 #กลับมาวันเเรกก็เที่ยวเลย😘",
    "post_created_at": "2023-10-09 04:13:58.000000",
    "post_taken_at": "2023-10-03 11:10:17.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.364501",
    "created_by": "System"
  },
  {
    "initial_id": 6,
    "user_id": "24577289",
    "username": "misspaiir",
    "full_name": "Supakorn Sarnsuwan",
    "caption": "I'm missing Chiangmai a lot right now. 😭 #throwback #chiangmai #thailand",
    "post_created_at": "2023-09-26 10:04:17.000000",
    "post_taken_at": "2023-09-26 10:04:15.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.381036",
    "created_by": "System"
  },
  {
    "initial_id": 7,
    "user_id": "39185006249",
    "username": "778hie",
    "full_name": "anditsmystory",
    "caption": "I'm missing Chiangmai a lot right now. 💜🤍 #throwback #chiangmai #thailand",
    "post_created_at": "2023-09-26 10:04:17.000000",
    "post_taken_at": "2023-08-27 08:25:47.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.400182",
    "created_by": "System"
  },
  {
    "initial_id": 8,
    "user_id": "22185800751",
    "username": "catrythasanee",
    "full_name": "Thasanee Catry",
    "caption": "I'm missing Chiangmai a lot right now. 💜🤍#throwback #chiangmai #thailand",
    "post_created_at": "2023-09-26 10:04:17.000000",
    "post_taken_at": "2023-08-18 04:53:20.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.413275",
    "created_by": "System"
  },
  {
    "initial_id": 9,
    "user_id": "24577289",
    "username": "misspaiir",
    "full_name": "Supakorn Sarnsuwan",
    "caption": "เธอสวยหรอ ฉันสวยกว่า 💐",
    "post_created_at": "2023-08-14 10:13:03.000000",
    "post_taken_at": "2023-08-14 10:13:02.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.437105",
    "created_by": "System"
  },
  {
    "initial_id": 10,
    "user_id": "6916106412",
    "username": "meganlemon1224",
    "full_name": "meganlemon",
    "caption": "ATV Adventure🏍🏍🏍",
    "post_created_at": "2023-07-22 10:15:51.000000",
    "post_taken_at": "2023-07-22 10:15:50.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.449337",
    "created_by": "System"
  },
  {
    "initial_id": 11,
    "user_id": "1463366155",
    "username": "pittahong",
    "full_name": "피터",
    "caption": "#grandcanyonwaterpark #치앙마이여행 #chiangmaithailand #물놀이",
    "post_created_at": "2023-07-18 08:34:06.000000",
    "post_taken_at": "2023-07-18 08:34:05.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.462150",
    "created_by": "System"
  },
  {
    "initial_id": 12,
    "user_id": "59229441980",
    "username": "junny_aqiu",
    "full_name": "aqiuaqiu",
    "caption": "Dance makes me feel confident.",
    "post_created_at": "2024-01-07 09:00:18.000000",
    "post_taken_at": "2024-01-07 09:00:16.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.472672",
    "created_by": "System"
  },
  {
    "initial_id": 13,
    "user_id": "16626536",
    "username": "lydiamcdermont",
    "full_name": "Lydia Mcdermont",
    "caption": "What a fab day🫶🏼🫶🏼🤩",
    "post_created_at": "2023-12-11 11:00:22.000000",
    "post_taken_at": "2023-12-11 11:00:21.000000",
    "location_id": 1,
    "created_at": "2024-01-21 00:19:55.484803",
    "created_by": "System"
  },
  ]


test_df = pd.DataFrame(test_data)
AnalyticData(test_df)
# AnalyticData()

def testTranslate():
    print(langDetector("2024"))
    print(langDetector("MAYA"))
    print(langDetector("เมญ่า"))
    print(langDetector("Wat"))
    print(langDetector("Wat Gate Garam"))
    print(langDetector("Doi"))
    print(langDetector("๑๒ ๒๒๗๑๓"))

    print(cleansingContext("Wat234324Gate25 Garam 1234567890"))
    print(cleansingContext("I go to Maya in 2024"))
    print(cleansingContext("I go to the sea 2024"))
    print(cleansingContext("Wat234324Gate25 Garam 1234567890"))
    print(cleansingContext("I go to Maya"))
    print(cleansingContext("I go to the sea"))
    print(cleansingContext("Wat"))
    print(cleansingContext("Maya in 2024"))
    print(cleansingContext("the sea 2024"))


testTranslate()

