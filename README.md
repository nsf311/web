# web
Visualization tool for information deserts of 311 datas

### Importing data from csv regression files
- Unzip files and place in /server/src/data
- Add column "user_type" with value corresponding to user type in file name (for all rows)
- Add column "frequency" with value corresponding to reporting frequency indicated in file name (for all rows)
- Start vagrant server
- Verify csv file name is correct in line 17 of "csvToMongo.py" and run

### Accessing data
- DB will be titled "hexData"
- Collection will be titled "hexagon"
