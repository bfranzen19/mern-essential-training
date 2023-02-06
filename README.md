# MERN ESSENTIAL TRAINING
- [LinkedIn Learning Course - MERN Essential Training](https://www.linkedin.com/learning/mern-essential-training/learn-all-about-mern?autoplay=true&u=83102426)

- Completed 5 Febraury, 2023

- A JavaScript project using MongoDB, Mongoose, React.js, Express.js, MaterializeCSS, Axios, Prettier, and Babel.

- After cloning the repo and installing MongoDB and MongoDB Compass, start MongoDB Community
```bash
brew services start mongodb-community
```

- Navigate to the application root folder
```bash
cd soccer
```

- In the `backend/` directory, start the server
```bash
cd backend
npm start
```

- In the `frontend/` directory, start the frontend server
```bash
cd ../frontend/
npm start
```

- In a browser window (if one doesn't open when the frontend server starts), go to `http://localhost:3000/` and you should see the `Soccer Management` app

- Available players in the database should be listed at the top. Clicking on a player will bring up their details in the component in the middle, and the form at the bottom allows you to add a new player to the database with First Name (required), Last Name (required), Phone (optional), Email (required), a Strength Rating, and an Endurance Rating.