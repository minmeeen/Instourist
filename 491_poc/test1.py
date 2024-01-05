### Enable to Extract ###
### Around 50 posts allow for extraction ###
### Reason : ... ###
import instaloader
import datetime, pytz

bot = instaloader.Instaloader()


USER = "user"
PASSWORD = "pass"
# bot = instaloader.Instaloader(quiet=False, download_geotags=False, download_comments=False, save_metadata=False,compress_json=False)
bot.login(USER, PASSWORD) 


f = open("night_safari_d1-31_m12.txt", "w")

i = 1
s = True
p = 1

location_id = 195304697182096

tz = pytz.timezone('Asia/Bangkok')
start_date = datetime.datetime(2022, 12, 1, tzinfo=tz)
end_date = datetime.datetime(2023,1, 1,tzinfo=tz)

l = bot.get_location_posts(location_id)

for post in l:
    print(post.date_local)
    if s == True:
        fd = post.date_local
        s = False

    if(start_date <= post.date_local < end_date):
        f.write(post.owner_username)
        f.write('\n')
        print(i)
        i+=1
    elif(post.date_local < start_date or (post.date_local==fd and p!=1)):
        break
    p+=1
print(p-1)
    
f.close()
