# [MERN ESSENTIAL TRAINING](https://www.linkedin.com/learning/mern-essential-training/learn-all-about-mern?autoplay=true&u=83102426)

## 1. SETTING UP
### INSTALL MONGODB
#### update/upgrade homebrew, npm, node
- update homebrew
    - [homebrew docs](https://docs.brew.sh/FAQ#how-do-i-update-my-local-packages)
```bash
brew -v # see version
brew update
brew upgrade
```

- update node & npm
    - use the use latest, stable version of node and npm
```bash
npm -v # see npm version
node -v # see node version
nvm use stable # use latest, stable version of node and npm
```

#### installing mongoDB
- install mongoDB
    - [community version](https://www.mongodb.com/docs/manual/administration/install-community/)
```bash
xcode-select --install # probably already installed for homebrew
brew tap mongodb/brew
brew update
brew install mongodb-community@6.0
```

#### run mongoDB
- start mongoDB
```bash
brew services start mongodb-community@6.0
```

- to stop mongoDB
```bash
brew services stop mongodb-community@6.0
```

- to list mongo services running
```bash
brew servies list
```

- to restart
```bash
brew services restart mongodb-community
```

#### install compass
- install from [compass](https://www.mongodb.com/products/compass)
- [docs](https://www.mongodb.com/docs/compass/master/)
- allows to interact directly with the mongoDB database
- open compass app, hit `connect` button and it should show the database(s)

### INSTALL DEVELOPER TOOLS
#### install postman
- [download](https://www.postman.com/downloads/)

#### install chrome react tools
- [chrome webstore](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- click `add to chrome` button

### INSTALL NODE & REACT
#### install node
- already installed and updated

#### create folder structure
- created `soccer` directory as example. this will hold backend and frontend.
- create `backend/` folder within `soccer` directory
- create frontend
    - `npx` -- grabs the files from the `create-react` repo, creates the application, and cleans that up. much more efficient.
    - fetches `create-react-app`, creates new application, and cleans directory
    - does not globally install anything
    - creates the `frontend` folder with all resources inside
```bash
npx create-react-app frontend
```

---
## 2. MERN: NODE & EXPRESS
### BABEL SETUP IN THE SERVER
#### bable setup in the server
- create the `.babelrc` file and populate it with presets
    - in the backend directory, initialize a package.json
```bash
cd backend # navigate to the backend directory
npm init # initialize the package.json
```

- install node modules
    - dev dependencies
        - babel-cli
        - babel-preset-env
        - babel-preset-stage-0
    - main dependencies
        - body-parser
        - express
        - mongoose
        - nodemon
```bash
npm i --save-dev babel-cli babel-preset-env babel-preset-stage-0 && npm i body-parser express mongoose nodemon
```

- create the `.babelrc` (config) file
    - basically an object that contains some presets and information on how to use babel with the packages installed.
```bash
touch .babelrc
```

- in the `.babelrc` file, add presets:
```json
{
    "presets": ["env", "stage-0"]
}
```

- _stage-0\_\_- when installed, it includes all the recent changes to the language (such as es2019) and all stages above and upcoming (up to 4). \_stage-4_ - finished and part of the library. _any doubts about which stage to put, use **stage-0**_.


### INITIAL SERVER SETUP
#### add commands to `package.json`
    - in the `package.json`, in `scripts` to:
```json
"scripts": {
    "start": "nodemon ./index.js --exec babel-node -e js"
}
```

- create `index.js` file in the `backend/` directory
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
app.get("/", (req, res) => res.send(`soccer app is running on port ${PORT}`));

/* SERVER */
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
```

### SERVER FILES & FOLDER
#### setting up folder structure
- start with source directory that contains:
    - controllers
    - models
    - routes

- in the `backend/` directory, create each directory:
```bash
mkdir controllers
mkdir models
mkdir routes
```

- inside each directory, create the files:
    - `soccerRoutes.js`
    - `playerModel.js`
    - `playerControllers.js`
```bash
touch routes/soccerRoutes.js
touch models/playerModel.js
touch contollers/playerControllers.js
```

---
## 3. MERN: MONGO & ROUTING
### SETUP DB
#### initializing the db

- in `backend/index.js`, import `mongoose`, `body-parser`, and create the mongoose connection to mongo db
    - `mongoose` allows us to simply the connections to mongo and use shorter syntax for queries
- `mongoose.Promise = global.Promise;` allows us to use a promise to connect to mongo. mongo will tell us we're connected, the `Promise` will expect a response before it actually tells whether it's successful
- `mongoose.connect('mongodb://localhost')` where `mongodb://localhost` would be the url
    - example: `mongoose.connect('mongodb://username:password@host:port/database?options...');`
- `app.use(bodyparser.urlencoded({ extended: true }));` allows us to pass the request and encode it properly so we can use it. when the request happens, this transpiles the code before we can actually use it.

```javascript
import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";

const app = express();
const PORT = 3000;

/* BODY PARSER */
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

/* MONGOOSE CONNECTION */
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/soccerDB", () =>
    console.log("connected to mongo!")
);

/* ROUTES */
app.get("/", (req, res) => res.send(`soccer app is running on port ${PORT}`));

/* SERVER */
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
```

### SETUP SCHEMA
#### creating the schema

- the schema dictates the types of data & the structure of your data that your database takes

    - schema defines the rules about what the db can accept

- in `models/playerModel.js`, import `mongoose` and create a new object using `mongoose.Schema`

```javascript
const Schema = mongoose.Schema;
export const PlayerSchema = new Schema({
    // everything in this object will be the values & types that the db will accept
});
```

- the schema should have `type` and can have `required`, `enum`, or `default`

```javascript
export const PlayerSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    },
    isCoach: {
        type: Boolean,
        default: false,
    },
    speed: {
        type: Number,
        enum: [1, 2, 3],
    },
    created_date: {
        type: Date,
        default: Date.now,
    },
});
```

### CREATE THE `POST` ENDPOINT
#### creating the POST endoint
- in `controllers/playerControllers.js`, import `mongoose`, `playerModel.js`
    - `import { PlayerSchema } from "../models/playerModel"` `{}` allows us to import specific function from a file

- create a player from the mongoose model that was imported
- create the first controller
    - `controllers` are basically the functions that interact with the database when we are making a `request` to the API
    - the `request` sends the request to the API with the route and the controller executes the function in the database.
    - the first controller will be the `addNewPlayer`
```javascript
export const addNewPlayer = (req, res) => {
    let newPlayer = new Player(req.body);

    newPlayer.save((err, Player) => {
        if (err) res.send(err.message);
        res.json(Player);
    });
};
```

#### create the routes
- in `routes/soccerRoutes.js`, create the first route
    - import the controllers
        - controllers need to connected to the routes so when we call the route from the request, it executes the controller
    - add the route
        - when we call the `POST` method on the route `/players`, it will execute the controller `addNewPlayer`
```javascript
const routes = (app) => {
    app.route("/players").post(addNewPlayer);
};
```

- use the new route in `index.js`
    - import `routes`
    - use `routes()` function

```javascript
routes(app); // this says that we have the routes in that function available
```

#### test in postman
- in postman, create a `POST` request
- in the body, select `x-www-form-urlencoded` radio button
- enter key value pairs
    - firstName, lastName, and email are the only required fields
- hit the `send` button
    - should get a response
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
- `playerController.js`, create new `getPlayers` function
```javascript
export const getPlayers = (req, res) => {
    Player.find({}, (err, Player) => {
        if (err) res.send(err.message);
        res.json(Player);
    });
};
```

- create a `GET` route
    - in `soccerRoutes`, add a new route for `GET`
        - import `getPlayers` function
        - add `.get(getPlayers)` to routes

```javascript
import {addNewPlayer, getPlayers} from "../controllers/playerControllers";

const routes = (app) => {
    app.route("/players")
        .post(addNewPlayer) // POST endpoint
        .get(getPlayers); // GET endpoint
};

export default routes;
```

#### fixing CORS:
- change server port to `3000` by changing the `PORT` variable in `index.js`
- install `cors` package to allow us to do CORS between the 2 applications
```bash
npm i cors
```

- import the `cors` package in the `index.js` server file
```javascript
import cors from 'cors';
```

- use `cors` in the application
```javascript
app.use(cors());
```

#### testing in postman:
- create a `GET` request to `localhost:4000/players`

### CREATE SPECIFIC ID `GET` ENDPOINT
#### create the `getPlayerById` function in `playerController.js`
- get the `id` from the `req.params`
```javascript
export const getPlayerById = (req, res) => {
    Player.findById(req.params.PlayerId, (err, Player) => {
        if (err) res.send(err.message);
        res.json(Player);
    });
};
```

#### create a new route in `soccerRoutes.js`
- make sure that what's following the `:` matches the expected value in `req.params` in the `playerController.js`

```javascript
const routes = (app) => {
    app.route("/players")
        .post(addNewPlayer) // POST endpoint
        .get(getPlayers); // GET endpoint - all players

    app.route("/player/:PlayerId").get(getPlayerById); // GET endpoint - player by Id
};
```

#### test in postman:
- create a `GET` request to `localhost:4000/player/63d32c8c799dac205ed5a855`

### CREATE A `PUT` ENDPOINT
#### create a new `updatePlayer` function in `playerController.js`
* use `findOneAndUpdate` method, pass the id, body, and set `new: true` so that the updated object is returned, not the original
```javascript
export const updatePlayer = (req, res) => {
    Player.findOneAndUpdate({ _id: req.params.PlayerId }, req.body, { new: true }, (err, Player) => {
        if(err) res.send(err.message);
        res.json(Player);
    });
};   
```

#### create the route
* in `soccerRoutes.js`:
    * import the new `updatePlayer` function from the `playerControllers.js`
    * add a `PUT` route to the `/player/:PlayerId`
    ```javascript
        app.route('/player/:PlayerId')
            .get(getPlayerById) // GET endpoint - player by Id    
            .put(updatePlayer)  // PUT endpoint - update player
    ```


### CREATE A `DELETE` ENDPOINT
#### create a new `delete` function in `playerController.js`
* use `remove` method, pass the id, alter the return
```javascript
export const deletePlayer = (req, res) => {
    Player.remove({ _id: req.params.PlayerId }, (err, Player) => {
        if(err) res.send(err.message);
        res.json({ message: `successfully deleted player with id ${req.params.PlayerId}` });
    });
};
```

#### create the route
* in `soccerRoutes.js`:
    * import the new `deletePlayer` function from the `playerControllers.js`
    * add a `DELETE` route to the `/player/:PlayerId`
```javascript
app.route('/player/:PlayerId')
        .get(getPlayerById)     // GET endpoint - player by Id    
        .put(updatePlayer)      // PUT endpoint - update player
        .delete(deletePlayer);  // DELETE endpoint - delete player
```
---
## 4. MERN: REACT FRONT END
### ADD A STYLING LIBRARY & FOLDER STRUCTURE
#### adding [materialize](https://materializecss.com/)
- install
    - [cdn version](https://materializecss.com/getting-started.html)
    - in `frontend/public/index.html`:
        - add `css cdn` link after the `manifest` link
        - move the javascript `script` just before the closing `body` tag
- open a terminal in the frontend folder
- start the application (this should open a new chrome window)
```bash
cd frontend/
npm start
```

#### creating folders
- in `src/`
    - create `Components` directory
    - create `Tests` directory
- in `Components/`
    - create `Player` directory
```bash
cd src
mkdir Components
mkdir Components/Player
mkdir Tests
```

#### moving folders
- move `App.js` and `App.css` inside of the `Components` directory
- move `App.test.js` inside of the `Tests` directory

#### alter files
- change the `App` import to reflect new structure
- empty `App.css`
```javascript
import App from "../Components/App";
```

#### create files for the `Player` component
- create a new file `PlayerList.js`
- create a new file `PlayerSingle.js`
- create a new file `PlayerForm.js`
```bash
touch Components/Player/PlayerList.js
touch Components/Player/PlayerSingle.js
touch Components/Player/PlayerForm.js
```

- correct the `App` import to reflect the new structure in `index.js`
```javascript
import App from "./Components/App";
```

- delete the `index.css` file

### ADD THE MAIN PAGE STRUCTURE
#### adding `simple react snippets` extension to vs code
- search for `simple react snippets` in the extensions
- click `install`
- all the shortcuts are on the extension page

#### using the `simple react snippets` extension
- in `PlayerSingle.js`
    - `imr` to import react
    - `sfc` to create a stateless function component
    - name it `PlayerSingle`
```jsx
import React from "react";

const PlayerSingle = () => {
    return <div>PlayerSingle</div>;
};

export default PlayerSingle;
```

- in `PlayerList.js`, do the same

```jsx
import React from "react";

const PlayerList = () => {
    return <div>PlayerList</div>;
};

export default PlayerList;
```

- in `PlayerForm.js`
    - `imr` to import react
    - `ccc` to create a class component with constructor
```jsx
import React from "react";

class PlayerForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return <div>PlayerForm</div>;
    }
}

export default PlayerForm;
```

- in `App.js`
    - remove the log
    - remove everything from the `<header>`, leaving only the `<div>` open and closing tags
    - import all 3 of the new components and use them inside of self-closing tags
        - `<ComponentName/>
```jsx
import React from "react";
import "./App.css";
import PlayerList from "./Player/PlayerList";
import PlayerSingle from "./Player/PlayerSingle";
import PlayerForm from "./Player/PlayerForm";

function App() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col s12">Menu</div>
            </div>
            <div className="row">
                <div className="col s3"><PlayerList/></div>
                <div className="col s9"><PlayerSingle/></div>
            </div>
            <div className="row">
                <div className="col s12"><PlayerForm/></div>
            </div>
        </div>
    );
}

export default App;
```

### ADD THE STATE & AXIOS
#### add `axios`
- install `axios`
    - alls us to do calls to the api with simple syntax
    - restart the frontend
```bash
# in the frontend folder, stop the frontend with ctrl+c
npm i axios
npm start
```

#### refactor `App.js`
- in `App.js`, change `function` to `class`, remove `()`, add `extends React.Component`
- add a `render()` function around the `return` statement
```jsx
class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col s12"> Menu </div>
                </div>
                <div className="row">
                    <div className="col s3"> PlayerList </div>
                    <div className="col s9"> PlayerSingle </div>
                </div>
                <div className="row">
                    <div className="col s12"> PlayerForm </div>
                </div>
            </div>
        );
    }
}
```

- create a `constructor`
    - pass `props`
    - use `super(props);`
        - this assigns the `props` to the `constructor`, allowing the use of `props` in the class
    - create a `state` object
        - the `state` will have:
            - an array of `players`
            - the `currentPlayer` which will be used to pass to the `PlayerSingle`
            - whenever the player is clicked in the `PlayerList`, it will update the `currentPlayer` and pass that down to the `PlayerSingle` component so that the user can see what's been clicked on.
```jsx
constructor(props) {
    super(props);
    this.state = {
        players: [],
        currentPlayer: {}
    }
}
```

- create a function called `updateCurrentPlayers` that will update the `currentPlayer` when that player is clicked using `this.setState()` 
```jsx
updateCurrentPlayer(item) {
    this.setState({
        currentPlayer: item,
    });
}
```

- bind the new function to the class
```jsx
constructor(props) {
    super(props);

    this.state = {
        players: [],
        currentPlayer: {},
    };

    this.updateCurrentPlayer = this.updateCurrentPlayer.bind(this);
}
```

- use `axios` to get the data
    - import `axios`
    - use the `axios` `componentDidMount()` method
        - when the component is mounted, it will make a call to fetch the data from the API
    - use the response to set the state of the `players` property
```jsx
import axios from 'axios';
...
componentDidMount() {
    const url = 'http://localhost:4000/players';

    axios.get(url)
        .then((response) => {
            this.setState({
                players: response.data
            })
        })
        .catch((error) => {
            console.error("ERROR: ", error.message);
        });
}
```

- in the `PlayerList`, pass: 
    - `players={this.state.players}` prop
        - this allows the `PlayerList` to access the `players` prop
    - `updateCurrentPlayer()` method 
        - allows the method to be available to the `PlayerList` component
```jsx
...
<div className="col s3">
    <PlayerList 
        players={this.state.players} 
        updateCurrentPlayer={this.updateCurrentPlayer}
    />
<div/>
...
```

### CREATE THE LISTING COMPONENT
#### in `PlayerList.js`, create the `PlayerList` component
- this component will have a list of players pass through it and we will list them out using the `map()` function to iterate through every player that's passed in the `players` array. for each player, we will create an `<a>` tag containing the `firstName` and `lastName` of each player and it will append each `item` on to the `<ul>` list. this will create the list that we can leverage later to click on an `item` and view that player.
- create an unordered list with a class name `"collection with header"`
- create a list item with a class name `"collection-header"`
    - within the `<li>`, use `<h4>` for the `Players` heading
- now, use the `props` that we get from the `state`
    - receive `props` in the function
    - use the `players` inside of the `props` annd `map()` them
        - allows it to iterate as many times as there are players in the database
        - return an `<a>` with:
            - `href="#!"`
            - `className` as `"collection-item"`
            - `key` as `item._id`
                - must have a unique key for every item in the `map()` function so we use the `_id` property
            - `onClick` as `updateCurrentPlayer`, which must be bound
                - if `bind` isn't used, it will run every single time there's an element from the players list
        - within the `<a>` and `</a>` tags, display the player first and last name using `{item.firstName}` and `{item.lastName}`
```jsx
const PlayerList = (props) => {
    return (
    <div>
        <ul className="collection with-header">
            <li className="collection-header"> <h4>Players</h4> </li>
            {props.players.map((item) => (                
                <a href="#!" className="collection-item" key={item._id} onClick={props.updateCurrentPlayer.bind(this,item)}>
                    {item.firstName} {item.lastName}
                </a>
            ))}
        </ul>
    </div>
    );
};
```

### CREATE THE SINGLE ITEM COMPONENT
#### create a menu in the main app
- go to [`materializecss.com`](https://materializecss.com/navbar.html) `navbar` component
- copy the example
- paste that code into the first row where the `Menu` `<div>` was originally
- replace all instances of `class` with `className` for `jsx`
- remove the links (we're only using this for the header, essentially) by removing the entire `<ul>`
- change the `href` to `/` instead of `#`
- change the color using the `className` after `nav-wrapper`, if desired
    - color examples can be found at [`materialize > css > color`](https://materializecss.com/color.html)

#### in `PlayerSingle.js`, create the `PlayerSingle` component 
- in `PlayerSingle`, we'll need to pass a few things because we'll now have data available to render from the `state.currentPlayer`
    - add a `prop` called `player` and pass it `this.state.currentPlayer`
- in `PlayerSingle.js` we'll leverage code from [`materialize > components > cards`](https://materializecss.com/cards.html)
     - copy the code from the `image card`
     - pass the `props` from the main `state`
     - paste in the `return ()`
     - change all `class` references to `className`
     - add the new image to `soccer/frontend/public`
     - change the path for the image
     - add the first and last name to the card
     - add other db properties to the card
```jsx
const PlayerSingle = (props) => {
    return (
        <div className="row">
            <div className="col s12 m7">
                <div className="card">
                    <div className="card-image">
                        <img src="soccer.png" alt="soccer ball"/>
                        <span className="card-title">{props.player.firstName} {props.player.lastName}</span>
                    </div>
                    <div className="card-content">
                        <p>Phone: {props.player.phone}</p>
                        <p>Email: {props.player.email}</p>
                        <p>Strength: {props.player.strength}</p>
                        <p>Endurance: {props.player.endurance}</p>
                    </div>
                    <div className="card-action">
                        Team: {props.player.team}
                    </div>
                </div>
            </div>
        </div>
    );
};
```

### ADD THE FORM BASE STRUCTURE
#### in `PlayerForm.js`, create the `PlayerForm` component
- [`materialize > components > forms > text inputs`](https://materializecss.com/text-inputs.html)
- copy the example
- paste in the `return()` of the `render()` method
- attach the method that will be created in the future `submitPlayer` to the form and `bind` it to `this`
- add a `<h1>` tag for the title of `Add a new player` with `className="center"`
- `<input>` tags:
    - remove `placeholder`
    - change `id` to match the `_id` in our database (from `first_name` to `firstName`)
    - remove `class="validate"`
    - add `First Name` between the `<input>` tags
- copy and paste `<input>` for last name
- copy the whole row and alter the first name `<input>` for phone and last name `<input>` for email
- repeat the same thing for strength and endurance ratings
- add a submit button

```jsx
...
render() {
        return (
            <div className="row">
                <h4 className="center">Add a new player</h4>
                <form className="col s12" onSubmit={this.submitPlayer.bind(this)}>
                      <div className="row">
                            <div className="input-field col s6">
                                <input id="firstName" ref="firstName" type="text"/>
                                <label htmlFor="firstName">First Name</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="lastName" ref="lastName" type="text"/>
                                <label htmlFor="lastName">Last Name</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="phone" ref="phone" type="text"/>
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="email" ref="email" type="text"/>
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="strength" ref="strength" type="text"/>
                                <label htmlFor="strength">Strength Rating</label>
                            </div>
                            <div className="input-field col s6">
                                <input id="endurance" ref="endurance" type="text"/>
                                <label htmlFor="endurance">Endurance Rating</label>
                            </div>
                        </div>
                        <button className="btn waves-effect waves-light" type="submit" name="action">Add Player</button>
                </form>
            </div>
        );
    }
```

### FINALIZE THE FORM
#### add and use the `submitPlayer()` function in `PlayerForm.js`
- remove the constructor (it's not necessary)
- add the `submitPlayer()` function
    - takes an `event`
    - prevent the default behavior (refreshing) with `event.preventDefault();`
    - import `axios`
    - use `axios` to create a `POST` to the database with a payload of all of the `<input>` data from the form
        - access the data from the form using `this.refs.<refName>.value`
            - example: `firstName: this.refs.firstName.value`
        - will need one property for each form `<input>`
        - use a `.then()` and `console.log()` the `response`
        - use a `.catch()` to catch the error and log it
    - the data in the `POST` request does not need to be in the same order as the form

```jsx
... 
submitPlayer(event) {
        event.preventDefault();
        const url = 'http://localhost:4000/players';
        const payload = {
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            phone: this.refs.phone.value, 
            email: this.refs.email.value,
            strength: this.refs.strength.value,
            endurance: this.refs.endurance.value
        };

        axios.post(url, payload).then((response) => {
            console.log('response: ', response, '\ndata: ', response.data);
        }).catch((error) => {
            console.error('ERROR: ', error.message);
        });
    };
...
```