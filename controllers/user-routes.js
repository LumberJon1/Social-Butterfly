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
        console.log(err);
        res.status(400).json(err);
    });
});

// GET a single user
router.get("/:id", (req, res) => {
    User.findOne({
        _id: req.params.id
    })
    // TODO: Populate thoughts for each user
    .select("-__v")
    .then((userData) => {
        if (!userData) {
            res.status(404).json("No user with this ID");
            return;
        }
        res.json(userData);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
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
    User.findOneAndUpdate(
        {
            _id: req.params.id
        },
        req.body,
        {
            new: true
        }
    )
    .select("-__v")
    .then(userData => {
        if (!userData) {
            res.status(400).json("No user with this ID");
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// DELETE a user
router.delete("/:id", (req, res) => {
    User.findOneAndDelete({_id: req.params.id})
    .then(userData => {
        if (!userData) {
            res.status(400).json("No user with this ID");
            return;
        }
        res.json(userData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;