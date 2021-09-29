#!/usr/bin/env python3
import os
import sys
import pandas as pd
import pymongo
import json



def import_content(filepath):
    mng_client = pymongo.MongoClient('127.0.0.1', 27017)
    mng_db = mng_client['hexData'] 
    collection_name = 'hexagon' 
    db_cm = mng_db[collection_name]
    cdir = os.path.dirname(__file__)
    file_res = os.path.join(cdir, filepath)

    data = pd.read_csv(file_res)
    data_json = json.loads(data.to_json(orient='records'))


    db_cm.insert_many(data_json)

def decorate_metadata(filepath, data_json):
    fileNum = os.path.basename(filepath)[0:2]

    data_json["non_gov_users"][0:] = True
    data_json["unsure_user"][0:] = False
    data_json["reported_more_than_2x"][0:] = False

    if (fileNum == "02" or fileNum == "03" or fileNum == "05" or fileNum == "06"):
        data_json["unsure_user"][0:] = True
    if (fileNum == "04" or fileNum == "05" or fileNum == "06"):
        data_json["unsure"][0:] = True
    if (    




if __name__ == "__main__":
    filepath = '/vagrant/src/data/01_hex_variables_non_gov_regardless_of_reporting_frequency_20210209.csv'
import_content(filepath)
