const router = require("express").Router();
const User = require("../models/User");

// GET all users
router.get("/", (req, res) => {
    User.find({})
    // TODO: Populate thoughts for each user
        .select("-__v")
        .sort({_id: -1})
        .then(userData => res.json(userData))
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        });
});

// GET a single user
router.get("/:id", (req, res) => {

});

// POST Create a new user
router.post("/", (req, res) => {
    User.create(req.body)
        .then(userData => res.json(userData))
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        });
});

// PUT update a user
router.put("/:id", (req, res) => {

});

// DELETE a user
router.delete("/:id", (req, res) => {

});

module.exports = router;