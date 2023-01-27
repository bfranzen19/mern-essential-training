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
#### initializing the db
* in `backend/index.js`, import `mongoose`, `body-parser`, and create the mongoose connection to mongo db
    * `mongoose` allows us to simply the connections to mongo and use shorter syntax for queries
* `mongoose.Promise = global.Promise;` allows us to use a promise to connect to mongo. mongo will tell us we're connected, the `Promise` will expect a response before it actually tells whether it's successful
* `mongoose.connect('mongodb://localhost')` where `mongodb://localhost` would be the url
    * example: `mongoose.connect('mongodb://username:password@host:port/database?options...');`
* `app.use(bodyparser.urlencoded({ extended: true }));` allows us to pass the request and encode it properly so we can use it. when the request happens, this transpiles the code before we can actually use it.

```javascript
import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";

const app = express();
const PORT = 3000;

/* BODY PARSER */
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

/* MONGOOSE CONNECTION */
mongoose.set('strictQuery', false);
mongoose.Promise = global.Promise; 
mongoose.connect('mongodb://localhost/soccerDB', () => 
    console.log('connected to mongo!')
);

/* ROUTES */
app.get("/", (req, res) => 
    res.send(`soccer app is running on port ${PORT}`)
);

/* SERVER */
app.listen(PORT, () => 
    console.log(`server running on port ${PORT}`)
);
```


### SETUP SCHEMA
#### creating the schema
* the schema dictates the types of data & the structure of your data that your database takes
    * schema defines the rules about what the db can accept

* in `models/playerModel.js`, import `mongoose` and create a new object using `mongoose.Schema`
```javascript
const Schema = mongoose.Schema;
export const PlayerSchema = new Schema({
    // everything in this object will be the values & types that the db will accept
});
```

* the schema should have `type` and can have `required`, `enum`, or `default`
```javascript
export const PlayerSchema = new Schema({
    firstName: { 
        type: String,
        required: true
    },
    phone: { 
        type: Number
    },
    isCoach: { 
        type: Boolean,
        default: false
    },
    speed: {
        type: Number,
        enum: [1, 2, 3]
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
```

### CREATE THE `POST` ENDPOINT
#### creating the POST endoint
* in `controllers/playerControllers.js`, import `mongoose`, `playerModel.js`
    * `import { PlayerSchema } from "../models/playerModel"` `{}` allows us to import specific function from a file

* create a player from the mongoose model that was imported

* create the first controller
    * `controllers` are basically the functions that interact with the database when we are making a `request` to the API
    * the `request` sends the request to the API with the route and the controller executes the function in the database.
    * the first controller will be the `addNewPlayer`
```javascript
export const addNewPlayer = (req, res) => {
    let newPlayer = new Player(req.body);

    newPlayer.save((err, Player) => {
        if(err) res.send(err.message);
        res.json(Player);
    });
};
```

#### create the routes
* in `routes/soccerRoutes.js`, create the first route
    * import the controllers
        * controllers need to connected to the routes so when we call the route from the request, it executes the controller
    * add the route
        * when we call the `POST` method on the route `/players`, it will execute the controller `addNewPlayer`
```javascript
const routes = (app) => {
    app.route('/players').post(addNewPlayer);
}
```

* use the new route in `index.js`
    * import `routes` 
    * use `routes()` function
```javascript
routes(app) // this says that we have the routes in that function available
```

#### test in postman
* in postman, create a `POST` request
* in the body, select `x-www-form-urlencoded` radio button
* enter key value pairs
    * firstName, lastName, and email are the only required fields
* hit the `send` button
    * should get a response
```json
{
    "firstName": "Homer",
    "lastName": "Bacon",
    "email": "homer.bacon@email.com",
    "isCoach": false,
    "_id": "63ce0776facc31c72892d475",
    "created_date": "2023-01-23T04:05:10.796Z",
    "__v": 0
}
```

### CREATE ALL ITEMS `GET` ENDPOINT
#### `GET` all players endpoint
* `playerController.js`, create new `getPlayers` function
```javascript
export const getPlayers = (req, res) => {
    Player.find({}, (err, Player) => {
        if(err) res.send(err.message);
        res.json(Player);
    });
};
```

* create a `GET` route
    * in `soccerRoutes`, add a new route for `GET`
        * import `getPlayers` function
        * add `.get(getPlayers)` to routes
```javascript
import { addNewPlayer, getPlayers } from '../controllers/playerControllers';

const routes = (app) => {
    app.route('/players')
        .post(addNewPlayer) // POST endpoint
        .get(getPlayers);   // GET endpoint
}

export default routes;
```

#### fixing CORS:
    * change server port to `3000` by changing the `PORT` variable in `index.js`
    * install `cors` package to allow us to do CORS between the 2 applications
    ```bash
    npm i cors
    ```

    * import the `cors` package in the `index.js` server file
    ```javascript
    import cors from 'cors';
    ```

    * use `cors` in the application
    ```javascript
    app.use(cors());
    ```

#### testing in postman:
    * create a `GET` request to `localhost:4000/players`

### CREATE SPECIFIC ID `GET` ENDPOINT
#### create the `getPlayerById` function in `playerController.js`
* get the `id` from the `req.params`
```javascript
export const getPlayerById = (req, res) => {
    Player.findById(req.params.PlayerId, (err, Player) => {
        if(err) res.send(err.message);
        res.json(Player);
    });
};
```

#### create a new route in `soccerRoutes.js`
* make sure that what's following the `:` matches the expected value in `req.params` in the `playerController.js` 
```javascript
const routes = (app) => {
    app.route('/players')
        .post(addNewPlayer)     // POST endpoint
        .get(getPlayers)        // GET endpoint - all players

    app.route('/player/:PlayerId')
        .get(getPlayerById);    // GET endpoint - player by Id    
}
```

#### test in postman:
* create a `GET` request to `localhost:4000/player/63d32c8c799dac205ed5a855`


### CREATE A `PUT` ENDPOINT
#### 


### CREATE A `DELETE` ENDPOINT
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