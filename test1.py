### Enable to Extract ###
### Around 50 posts allow for extraction ###
### Reason : ... ###
import instaloader
import datetime

bot = instaloader.Instaloader()


USER = "username"
PASSWORD = "password"
# bot = instaloader.Instaloader(quiet=False, download_geotags=False, download_comments=False, save_metadata=False,compress_json=False)
bot.login(USER, PASSWORD) 


f = open("dataset\walkingstreet_d1-27_m12.txt", "a")
l = bot.get_location_posts(121474598025096)
# print(type(l))
i = 1

start_date = datetime.datetime(2022, 12, 1)
end_date = datetime.datetime(2022, 12, 31)

for post in l:
    print(post.date)
    if(start_date < post.date and post.date < end_date):
        f.write(post.owner_username)
        f.write('\n')
        i+=1
    else:
        break
    
    print(i)
f.close()
