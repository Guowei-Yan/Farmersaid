import xlsxwriter as xls
import pandas as pd
import numpy as np
import operator
import re
import pickle

xls_file = pd.ExcelFile('DAT-Fatalities-as-of-december-2016-12.xls')
df = xls_file.parse('Fatalities -Details')
lga = df.iloc[:,7]
lga = list(lga)
dc = {}
df = df.dropna()
df.columns = df.iloc[0]
df = df.iloc[1:]
df = df.reset_index().iloc[:,2:]

fatalities = df[df.iloc[:,4].str.contains("Agriculture")]
fatalities = fatalities.reset_index().iloc[:,1:]

lst = []
for items in fatalities.iloc[:,-1]:
    items = items.split("(")[0]
    if items[-1] == " ":
        items = items[:-1]
    lst.append(items)
fatalities.iloc[:,-1] = lst

fatalities[fatalities.iloc[:,2].str.contains("less")].iloc[:,5].value_counts()
############################################### data1 end

injure = pd.ExcelFile("DAT-claims-reported-by-financial-year-2018-01.xls")
injure = injure.parse(sheet_name="Claims")
injure.columns = injure.iloc[5]
injure.columns.name=None
injure.rename(columns={injure.columns[0]:injure.loc[6][0],injure.columns[1]:injure.loc[6][1]},inplace=True)
injure = injure.loc[7:]
injure = injure[injure.iloc[:,1].str.contains("Agriculture").fillna(False)]
lst = []
for items in injure.iloc[:,0]:
    items = items.split("(")[0]
    if items[-1] == " ":
        items = items[:-1]
    lst.append(items)
injure.iloc[:,0] = lst
injure.rename(columns={injure.columns[0]:"LGA"},inplace=True)
injury = pd.concat([injure.iloc[:,0],injure.iloc[:,-1]],axis=1)
injury = injury.reset_index().iloc[:,1:]
injury.rename(columns={injury.columns[-1]:"number"},inplace=True)

##################################### concat 2 df
lga1 = fatalities.iloc[:,-1]
lga2 = injure.iloc[:,0]
ss = set(lga2)

notin = list()
for area in lga1:
    if area not in ss:
        notin.append(area)
indd = fatalities.index[fatalities.iloc[:,-1].str.contains(notin[0])].tolist()[0]
fatalities.iloc[indd,-1] = 'Colac-Otway'
lga1 = fatalities.iloc[:,-1]
lga2 = injure.iloc[:,0]
notin = []
for area in lga1:
    if area not in ss:
        notin.append(area)
lga1 = set(lga1)
lga1 = list(lga1)
lga2 = list(lga2)
final1 = pd.DataFrame(columns=["lga","number","cause"])
for inddi in range(0,len(lga2)):
    numbers = injury[injury["LGA"]==lga2[inddi]]["number"].values[0]
    lgas = lga2[inddi]
    try:
        causes = fatalities[fatalities["LGA"]==lgas].iloc[:,-2].value_counts().keys()[0]
    except:
        causes = "No"
    final1.loc[inddi] = [lgas,numbers,causes]

final1[final1.cause.str.contains("Tractor")].iloc[:,2] = "Tractor Accident"
final1.iloc[final1[final1.cause.str.contains("Tractor")].index,2]= "Tractor Accident"

final1.iloc[final1[final1.cause.str.contains("Fall")].index,2] = "Fall"
final1.iloc[final1[final1.cause.str.contains("hit")].index,2] = "Struck"
final1.iloc[final1[final1.cause.str.contains("struck")].index,2] = "Struck"
final1.iloc[final1[final1.cause.str.contains("accident")].index,2] = "Tractor Accident"
final1.iloc[final1[final1.cause.str.contains("Prime")].index,2] = "Tractor Accident"
final1.iloc[final1[final1.cause.str.contains("machine")].index,2] = "Tractor Accident"
final1.iloc[final1[final1.cause.str.contains("Burn")].index,2] = "Burn"
final1.iloc[final1[final1.cause.str.contains("rider")].index,2] = "Animal"
final1.iloc[final1[final1.cause.str.contains("slasher")].index,2] = "Tractor Accident"
final1.iloc[final1[final1.cause.str.contains("fume")].index,2] = "Toxic"
final1.iloc[final1[final1.cause.str.contains("crushed")].index,2] = "Struck"

ll = len(final1)
for areas in range(0,3):
    final1.loc[ll+areas] = [ui[areas],0,"No"]
final1.to_csv("final1.csv")

############ Second Graph

import re
dff = pd.read_csv("20140701ofswq_workerscompensation.csv")
final2 = pd.DataFrame(columns=[])
farmer = dff[dff.iloc[:,7].str.contains("AGR")]
body_part = farmer.iloc[:,-4].value_counts().keys()
farmer = farmer[farmer.iloc[:,8].str.contains("FARM")]
farmer = farmer.reset_index().iloc[:,1:]
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("LIMB")].iloc[:,-4].index,-4] = "LIMB"
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("HEAD")].index,-4] = "HEAD"
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("FACE")].index,-4] = "FACE"
rows = [ind for ind in farmer.index if ind not in farmer[farmer.iloc[:,-4].str.contains("UNSPECIFIED")].index]

farmer = farmer.loc[rows].reset_index().iloc[:,1:]
part = farmer.iloc[:,-4].value_counts().keys()
prog = re.compile(r'\D+')
for i in range(0,len(farmer)):
    parts = prog.findall(farmer.iloc[i,-4])[0]
    if parts[0] == " ":
        parts = parts[1:]
    farmer.iloc[i,-4] = parts
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("NECK")].index,-4] = "NECK AND SHOULDER"
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("SHOULDER")].index,-4] = "NECK AND SHOULDER"
farmer = farmer.reset_index().iloc[:,1:]

for i in range(0,len(farmer)):
    inju = prog.findall(farmer.iloc[i,9])[1]
    if inju[0] == " ":
        inju = inju[1:]
    farmer.iloc[i,9] = inju
part = farmer.iloc[:,-4].value_counts().keys()
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("EYE")].index,-4] = "HEAD"
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("NOSE")].index,-4] = "HEAD"
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("MOUSE")].index,-4] = "HEAD"
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("EAR")].index,-4] = "HEAD"
farmer.iloc[farmer[farmer.iloc[:,-4].str.contains("LEG")].index,-4] = "LEG"
part = farmer.iloc[:,-4].value_counts().keys()
rows = [ind for ind in farmer.index if ind not in farmer[farmer.iloc[:,-4].str.contains("PSYCH")].index]
final2 = pd.DataFrame(columns=["age","body","injury"])
final2.age = farmer.iloc[:,6]
final2.body = farmer.iloc[:,-4]
final2.injury = farmer.iloc[:,9]
final2.to_csv("final2.csv")
