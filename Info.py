import pandas as pd
import numpy as np


def getStat(s):
    mcount = [0,0,0,0,0,0,0]
    df = pd.read_csv(s, error_bad_lines=False)
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