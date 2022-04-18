const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;
const currentDB = process.env.currentDB || "social-butterfly";

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(require("./controllers"));

// Connect Mongoose to the local social-butterfly database if no environment DB is specified
mongoose.connect("mongodb://localhost/social-butterfly", () => console.log(`Connected to the ${currentDB} database.`));

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`Connection established on localhost:${PORT}`));