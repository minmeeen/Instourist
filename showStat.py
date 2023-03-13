import Info
import numpy as np
import matplotlib.pyplot as plt
import random

# file = open("dataset/all labeled", 'r') 
# lines = file.readline()
mcount = []
ccount= []
i=0

with open("dataset/all labeled") as file:
    for line in file:
        # print(line)
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





# ## Random 

# r_count = []
# f = []

# for i in range(5):
#     a = random.choice(list(open('dataset/all labeled')))
#     f.append(a)
#     while a in f:
#         a = random.choice(list(open('dataset/all labeled')))
#     print(a)
#     stat = Info.getStat(a.rstrip('\n'))
#     r_count.append (stat)

# print(r_count)


# rand_c = []
# for i in range(7):
#     m=0
#     for j in range(len(r_count)):
#         m+= r_count[j][i]
#     rand_c.append(m)

# print(rand_c)

# print(count)
# print(country)
# print('sum',sum(count))
# print('sum',sum(country))
# print('mean', np.mean(count))
# print('sd',np.std(count))
# # 



# #find condident level
# meth = [count[0],count[4],count[2]]
# n = sum(meth)
# n_all = sum(country)
# cap = count[0]
# other_cap = count[4]
# bio = count[2]


# print("confident caption: ", cap/n_all)
# print("confident other posts caption: ", other_cap/n_all)
# print("confident bio: ", bio/n_all)

# m = np.mean(meth)
# sd = np.std(meth)
# std_err = np.std(meth)/n
# print('z caption: ', (meth[0]-m)/sd)
# print('z other posts caption: ', (meth[1]-m)/sd)
# print('z bio: ', (meth[2]-m)/sd)


method = np.array(['caption' ,'comment' ,'bio' ,'name','other posts caption' ,'other posts comment','location frequency'])
count = np.array(count)
plt.ylabel('Count')
plt.xlabel('Method'); 
plt.bar(method,count)
plt.show()

plt.ylabel('Count')
plt.xlabel('Country');    


# print(count)
ct = np.array(['Thailand' ,'Non-Thailand' ,'Local' ,'Unknown'])
country = np.array(country)

plt.bar(ct,country)
plt.show()
