import csv
from collections import Counter

datalist = []
countrylist = []

mcount = dict(m_caption = 0,m_comment= 0,m_bio = 0,
                   m_name = 0,m_other_posts_caption = 0,
                   m_other_posts_comment = 0,m_location_frequency = 0)

# read data and append into list
with open("dataset\labeled\maetaeng elephant\maetaeng_elephant_d2_d14_m2_2023.csv", 'r') as file:
  csvreader = csv.reader(file)
  n = 0
  for row in csvreader:
    if n == 0: pass
    else:
        d = dict(username=row[0],caption=row[1],comment=row[2],
                bio=row[3],name=row[4],other_posts_caption=row[5],
                other_posts_comment=row[6],location_frequency=row[7])
        datalist.append(d)
        countrylist.append(row[9])
    n+=1

# count method use time
for datas in datalist:
    # print(datas['caption']!= "")
    if(datas['caption'] != ""):
       mcount['m_caption']+=1
    if(datas['comment'] != ""):
       mcount['m_comment']+=1
    if(datas['bio'] != ""):
       mcount['m_bio']+=1
    if(datas['name'] != ""):
       mcount['m_name']+=1
    if(datas['other_posts_caption'] != ""):
       mcount['m_other_posts_caption']+=1
    if(datas['other_posts_comment'] != ""):
       mcount['m_other_posts_comment']+=1
    if(datas['location_frequency'] != ""):
       mcount['m_location_frequency']+=1

# display method count
for keys, value in mcount.items():
   print(keys,value)

# for c in countryAlllist:
#    if c not in countrylist:
#       countrylist.append(c)

# count each country's username
cnt = Counter()
for c in countrylist:
   cnt[c]+=1
print(cnt)

