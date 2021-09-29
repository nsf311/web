import os
import pandas as pd
from pymongo import MongoClient
import json

def decorateRow(row):
    #['', 'HEX_600', 'HEX_weighted_average_distance', 'HEX_weighted_mean_home_distance', 'HEX_weighted_max_home_distance', 'HEX_weighted_median_home_distance', 'HEX_weighted_radius_of_gyration', 'HEX_weighted_num_reporting_2015', 'HEX_weighted_HEX_coverage', 'HEX_weighted_subject_coverage', 'HEX_weighted_subject_hhi', 'HEX_total_reporting', 'HEX_total_user']
    record = row[2:].to_frame().transpose()
    return record

client = MongoClient('localhost', 27017)
db = client['hexData']
coll = db['hexagon']

directory = "/vagrant/src/data"
for filename in os.listdir(directory):
    if filename.endswith(".csv"):
        data = pd.read_csv(os.path.join(directory, filename), sep='\t')
        for index, row in data.iterrows():
            # print(json.loads(decorateRow(row).to_json(orient='records'))[0])
            coll.update_one({
                'HEX_600': row.HEX_600,
            },
            {
                '$push': 
                {
                    'results': json.loads(decorateRow(row).to_json(orient='records'))[0]
                }
            })