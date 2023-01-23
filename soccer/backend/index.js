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