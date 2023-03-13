import pandas as pd
import numpy as np
import math


def getStat(s):
    mcount = [0,0,0,0,0,0,0]
    df = pd.read_csv(s, on_bad_lines='skip')
    # df = df.drop_duplicates(['username'])
    df = df.replace('',np.nan)
    # print(df)
    for i in range(len(df)):
        # print(np.isnan(df.iloc[i][1]) )
        if(np.isnan(df.iloc[i][1]) == False):
            mcount[0]+=1
        if(np.isnan(df.iloc[i][2]) == False):
            mcount[1]+=1
        if(np.isnan(df.iloc[i][3]) == False):
            mcount[2]+=1
        if(np.isnan(df.iloc[i][4]) == False):
            mcount[3]+=1
        if(np.isnan(df.iloc[i][5]) == False):
            mcount[4]+=1
        if(np.isnan(df.iloc[i][6]) == False):
            mcount[5]+=1
        if(np.isnan(df.iloc[i][7]) == False):
            mcount[6]+=1
    
    return mcount

def getCountry(s):
    count = [0,0,0,0]
    df = pd.read_csv(s, on_bad_lines='skip')
    # df = df.drop_duplicates(['username'])
    df = df.replace('',np.nan)
    # print(df.dtypes)
    for i in range(len(df)):
        # print(s,df.isnull().sum()) 
        if(df.iloc[i][9].lower() == 'thailand'):
            count[0]+=1
        elif(df.iloc[i][9].lower() == 'nat'):
            count[2]+=1
        elif(df.iloc[i][9].lower() == 'unknown'):
            count[3]+=1
        else:
            count[1]+=1
    return count

def weighted_average(values, weights):
    # weighted_sum = []
    # for value, weight in zip(values, weights):
    #     weighted_sum.append(value * weight)

    # avg = sum(weighted_sum) / sum(weights)
    # variance = np.average((values-avg)**2, weights=weights)
    # return (avg, math.sqrt(variance))
    average = np.average(values, weights=weights)
    # Fast and numerically precise:
    variance = np.average((values-average)**2, weights=weights)
    return (average, math.sqrt(variance))