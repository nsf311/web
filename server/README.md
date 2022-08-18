# vagrant-nodejs-mongo

This Vagrant machine contains:

- Ubuntu 20.04
- Node.js 14
- MongoDB 4.4

## How to use
- Install [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads)
- Open up a terminal
- Clone this repository
- Run `cd server`
- Run `vagrant up` in the server folder 
- Run `cd src`
- Run `npm install`
- Log in to the machine running `vagrant ssh`
- `cd /vagrant/src`
- `npm start`
* The app is now running on the virtual machine. The virtual machine's port **3000** is mapped to the host machine's port **3001**. Go to your web browser and type `http://localhost:3001`

---
- To stop the server run `ctrl + c`
- To exit the machine just run `exit`
- To shut down the machine run `vagrant halt`
- To remove the machine with all its files run `vagrant destroy`

### Shared folder

The `/vagrant` folder in the virtual machine is synchronized with the server folder in your machine. Any changes you make in the `/vagrant` folder will be visible on your machine and vice-versa.
