# [MERN ESSENTIAL TRAINING](https://www.linkedin.com/learning/mern-essential-training/learn-all-about-mern?autoplay=true&u=83102426)

## 1. SETTING UP
### INSTALL MONGODB
#### update/upgrade homebrew, npm, node
* update homebrew
    * [homebrew docs](https://docs.brew.sh/FAQ#how-do-i-update-my-local-packages)

```bash
brew -v # see version
brew update
brew upgrade
```

* update node & npm
    * use the use latest, stable version of node and npm

```bash
npm -v # see npm version
node -v # see node version
nvm use stable # use latest, stable version of node and npm
```

#### installing mongoDB
* install mongoDB
    * [community version](https://www.mongodb.com/docs/manual/administration/install-community/)

```bash 
xcode-select --install # probably already installed for homebrew
brew tap mongodb/brew
brew update
brew install mongodb-community@6.0
```

#### run mongoDB
* start mongoDB
```bash
brew services start mongodb-community@6.0
```

* to stop mongoDB
```bash
brew services stop mongodb-community@6.0
```

* to list mongo services running
```bash
brew servies list
```

* to restart
```bash
brew services restart mongodb-community
```

#### install compass
* install from [compass](https://www.mongodb.com/products/compass)
* [docs](https://www.mongodb.com/docs/compass/master/)
* allows to interact directly with the mongoDB database
* open compass app, hit `connect` button and it should show the database(s)

### INSTALL DEVELOPER TOOLS
#### 


### INSTALL NODE & REACT
#### 


---
## 2. MERN: NODE & EXPRESS
### BABEL SETUP IN THE SERVER
#### 


### INITIAL SERVER SETUP
#### 


### SERVER FILES & FOLDER
#### 


---
## 3. MERN: MONGO & ROUTING
### SETUP DB
#### 


### SETUP SCHEMA
#### 


### CREATE THE POST ENDPOINT
#### 


### CREATE ALL ITEMS GET ENDPOINT
#### 


### CREATE SPECIFIC ID GET ENDPOINT
#### 


### CREATE A PUT ENDPOINT
#### 


### CREATE A DELETE ENDPOINT
#### 


---
## 4. MERN: REACT FRONT END
### ADD A STYLING LIBRARY & FOLDER STRUCTURE
#### 


### ADD THE MAIN PAGE STRUCTURE
#### 


### ADD THE STATE & AXIOS
#### 


### CREATE THE LISTING COMPONENT
#### 


### CREATE THE SINGLE ITEM COMPONENT
#### 


### ADD THE FORM BASE STRUCTURE
#### 


### FINALIZE THE FORM
#### 


### EXTEND THE APPLICATION
#### 