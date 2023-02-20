from Info import getStat
import numpy as np
import matplotlib.pyplot as plt

# file = open("dataset/all labeled", 'r') 
# lines = file.readline()
mcount = []
i=0

with open("dataset/all labeled") as file:
    for line in file:
        # print(line)
        stat = getStat(line.rstrip('\n'))
        mcount.append (stat) 
        i+=1
        

count = []

for i in range(7):
    m=0
    for j in range(len(mcount)):
        m+= mcount[j][i]
    count.append(m)

    

plt.ylabel('Count')
plt.xlabel('Method');    

print(count)
method = np.array(['caption' ,'comment' ,'bio' ,'name','other posts caption' ,'other posts comment','location frequency'])
count = np.array(count)

plt.bar(method,count)
plt.show()
