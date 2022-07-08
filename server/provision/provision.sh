sudo apt-get update

# Install Node.js and NPM
# The certificate for deb.nodesource seems to be expired
# pass through the certificate error 
sudo apt install ca-certificates
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start and enable the Mongo service so that it automatically starts every time you start the machine
sudo systemctl start mongod
sudo systemctl enable mongod

# import data to db
mongorestore --drop -d boston311  -c bos311Hex /vagrant/src/db/hexagon.bson
# pushd /vagrant/src/ && npm start; popd



