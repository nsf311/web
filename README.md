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
# Boston 311 Visualization System
Visualization tool for information deserts of 311 data. 
This application is built with MERN stack (MongoDB, Express, React.js and Node.js) and leaflet.js for interactive map. 
The back-end server uses Node.js + Express for REST APIs, and front-end side is a React client with React Router and Axios.

### Folder Structure
#### client
* React UI components: src/components
    1. BosMap.js
    2. HexRegression.js
    3. RegressionPlt.js
    4. Axis.js
    5. RenderCircles.js
* GeoJson of Boston hexagons: src/data/
    1. hexagon_600m_311_pop_20200707.json
* Http request and response using Axios:
    1. src/http-common.js 
    2. src/services/bos311.service.js

#### server
* Configuration of server and database: 
    1. src/config/db.config.js
* Database dump:
    1. src/db/hexagon.bson
* MVC framework:
    1. src/models
    2. src/routers
    3. src/controllers

* Vagrant:
    1. ./Vagrantfile
    2. provision/provision.sh

### To run the system locally:
- Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads)
- Open up a terminal
- Clone this repository
#### Start the server on the virtual machine:
- Run `cd server`
- Run `vagrant up` in the server folder 
- Run `cd src`
- Run `npm install`
- Log in to the machine running `vagrant ssh`
- `cd /vagrant/src`
- `npm start`

* The app is now running on the virtual machine. The virtual machine's port **3000** is mapped to the host machine's port **3001**. 
* The `/vagrant` folder in the virtual machine is synchronized with the server folder in your machine. Any changes you make in the `/vagrant` folder will be visible on your machine and vice-versa.

#### Start the front-end application
- Open up another teminal window and change the directory to the client folder 
- Run `npm install` to install the node modules
- Run `npm start`

Go to the web browser and type: http://localhost:3000/



