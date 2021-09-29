import pandas as pd
from pymongo import MongoClient
import json

client = MongoClient('localhost', 27017)
db = client['hexData']
coll = db['hexagon']
data = pd.read_csv("/vagrant/src/data/01_hex_variables_non_gov_regardless_of_reporting_frequency_20210209.csv", sep='\t')
for index, row in data.iterrows():
    coll.insert_one({
        'HEX_600': row.HEX_600,
        'results': []
    })
