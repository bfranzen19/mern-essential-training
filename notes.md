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
#### install postman
* [download](https://www.postman.com/downloads/)

#### install chrome react tools
* [chrome webstore](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* click `add to chrome` button

### INSTALL NODE & REACT
#### install node 
* already installed and updated

#### create folder structure
* created `soccer` directory as example. this will hold backend and frontend.
* create `backend/` folder within `soccer` directory
* create frontend
    * `npx` -- grabs the files from the `create-react` repo, creates the application, and cleans that up. much more efficient. 
    * fetches `create-react-app`, creates new application, and cleans directory
    * does not globally install anything
    * creates the `frontend` folder with all resources inside
```bash
npx create-react-app frontend
```

---
## 2. MERN: NODE & EXPRESS
### BABEL SETUP IN THE SERVER
#### bable setup in the server
* create the `.babelrc` file and populate it with presets
    * in the backend directory, initialize a package.json
```bash
cd backend # navigate to the backend directory
npm init # initialize the package.json 
```

* install node modules
    * dev dependencies
        * babel-cli
        * babel-preset-env 
        * babel-preset-stage-0
    * main dependencies
        * body-parser
        * express
        * mongoose
        * nodemon
```bash
npm i --save-dev babel-cli babel-preset-env babel-preset-stage-0 && npm i body-parser express mongoose nodemon
```

* create the `.babelrc` (config) file
    * basically an object that contains some presets and information on how to use babel with the packages installed.
```bash
touch .babelrc
```

* in the `.babelrc` file, add presets:
```json
{
    "presets": [
        "env",
        "stage-0"
    ]
}
```
* _stage-0__- when installed, it includes all the recent changes to the language (such as es2019) and all stages above and upcoming (up to 4). _stage-4_ - finished and part of the library. _any doubts about which stage to put, use **stage-0**_.

### INITIAL SERVER SETUP
#### add commands to `package.json`
    * in the `package.json`, in `scripts` to:
```json
"scripts": {
    "start": "nodemon ./index.js --exec babel-node -e js"
}
```

* create `index.js` file in the `backend/` directory
```bash
touch index.js
```

#### create the initialserver code
```javascript
// index.js
import express from "express";

const app = express();
const PORT = 3000;

/* ROUTES */
app.get("/", (req, res) => 
    res.send(`soccer app is running on port ${PORT}`)
);

/* SERVER */
app.listen(PORT, () => 
    console.log(`server running on port ${PORT}`)
);
```


### SERVER FILES & FOLDER
#### setting up folder structure
* start with source directory that contains:
    * controllers
    * models
    * routes

* in the `backend/` directory, create each directory:
```bash 
mkdir controllers
mkdir models
mkdir routes
```

* inside each directory, create the files:
    * `soccerRoutes.js`
    * `playerModel.js`
    * `playerControllers.js`

```bash
touch routes/soccerRoutes.js
touch models/playerModel.js
touch contollers/playerControllers.js
```

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