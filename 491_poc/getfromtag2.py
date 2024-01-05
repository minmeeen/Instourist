import instaloader
import datetime, pytz

# Get instance
L = instaloader.Instaloader()

USER = "instourist2022"
PASSWORD = "2022tweetrip"

# Optionally, login or load session
L.login(USER, PASSWORD)        # (login)
L.interactive_login(USER)      # (ask password on terminal)
# L.load_session_from_file(USER) # (load session created w/
                               #  `instaloader -l USERNAME`)

f = open("doipui.txt","w")

time_zone = pytz.timezone('Asia/Bangkok')
start = datetime.datetime(2023, 2, 1, tzinfo = time_zone)
end = datetime.datetime(2023, 2, 20, tzinfo = time_zone)

s = True

for post in instaloader.Hashtag.from_name(L.context, 'doipui').get_posts():
    if (s == True):
        fd = post.date_local
        s = False

    if(start <= post.date_local < end ):
        # L.download_post(post, target='##watchiangmuntemple')
        print(post.owner_username," ",post.date_local)
        f.write(post.owner_username)
        f.write('\n')
    elif (post.date_local < start or post.date_local == fd):
        break

f.close()