import Info
import numpy as np
import matplotlib.pyplot as plt
import random



def addlabels(x,y):
    for i in range(len(x)):
        plt.text(i, y[i], y[i], ha = 'center',
                 Bbox = dict(facecolor = 'blue', alpha =.8))
        



# file = open("dataset/all labeled", 'r') 
# lines = file.readline()
mcount = []
ccount= []
i=0

with open("labeledm2.txt") as file:
    for line in file:
        print(line)
        stat = Info.getStat(line.rstrip('\n'))
        coun = Info.getCountry(line.rstrip('\n'))
        mcount.append (stat)
        ccount.append(coun) 
        i+=1
        

count = []
country = []

for i in range(7):
    m=0
    c=0
    for j in range(len(mcount)):
        m+= mcount[j][i]
    count.append(m)


for k in range(4):
    c=0
    for l in range(len(mcount)):
        c+= ccount[l][k]
    country.append(c)






method = np.array(['caption' ,'comment' ,'bio' ,'name','other posts caption' ,'other posts comment','location frequency'])
method_c = np.array(['other posts caption', 'caption' ,'other posts comment', 'bio','name' ,'comment' ,'location frequency'])

sort_c = np.sort(count)[::-1]
print(sort_c)
sort_c = np.divide(sort_c,sum(country))*100
# count = np.array(count)
plt.ylabel('Percent')
plt.xlabel('Method') 
# plt.bar(method,count)
for index,data in enumerate(sort_c):
    plt.text(x=index , y =data+1 ,ha = 'center', s=f"{data}" , fontdict=dict(fontsize=10))
plt.bar(method_c,sort_c)
plt.axis(ymin=0, ymax=100)
plt.show()





plt.ylabel('Count')
plt.xlabel('Origin');    


# print(count)
ct = np.array(['Thailand' ,'Non-Thailand' ,'Commercial' ,'Unknown'])
country = np.array(country)

plt.bar(ct,country)
plt.show()
