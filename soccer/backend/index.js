import express from "express";
import mongoose from "mongoose";
import bodyparser from "body-parser";
import cors from "cors";
import routes from "./routes/soccerRoutes";

const app = express();
const PORT = 4000;

/* BODY PARSER */
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

/* CORS */
app.use(cors());

/* MONGOOSE CONNECTION */
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/soccerDB", () =>
    console.log("connected to mongo!")
);

/* ROUTES */
app.get("/", (req, res) => res.send(`soccer app is running on port ${PORT}`));

routes(app);

/* SERVER */
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
