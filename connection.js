const mongoose = require("mongoose");

const currentDB = process.env.currentDB || "social-butterfly";

mongoose.connect("mongodb://localhost/social-butterfly", () => console.log(`Connected to the ${currentDB} database.`));
