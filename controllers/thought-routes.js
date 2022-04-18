const router = require("express").Router();
const Thought = require("../models/Thought");
const User = require("../models/User");

// GET all route for all thoughts
router.get("/", (req, res) => {
    Thought.find({})
    .select("-__v")
    .sort({_id: -1})
    .then(thoughtData => res.json(thoughtData))
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
})

// GET single thought by thought ID
router.get("/:id", (req, res) => {
    Thought.findOne({
        _id: req.params.id
    })
    .select("-__v")
    .then((thoughtData) => {
        if (!thoughtData) {
            res.status(404).json("No thought with this ID");
            return;
        }
        res.json(thoughtData);
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
});

// POST a new thought
router.post("/", (req, res) => {
    Thought.create(req.body)
    // Append the created thought to the user with matching username
    .then(({username, _id}) => {
        return User.findOneAndUpdate(
            {username: username},
            {$push: {thoughts: _id}},
            {new: true}
        );
    })
    .then(userData => res.json(userData))
    .catch((err) => {
        console.log(err)
        res.status(400).json(err)
    });
});

// PUT update a single thought by ID
router.put("/:id", (req, res) => {
    Thought.findOneAndUpdate(
        {
            _id: req.params.id
        },
        req.body,
        {
            new: true
        }
    )
    .select("-__v")
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(400).json("No thought with this ID");
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

// DELETE a thought by ID
router.delete("/:id", (req, res) => {
    Thought.findOneAndDelete({_id: req.params.id})
    .then(thoughtData => {
        if (!thoughtData) {
            res.status(400).json("No thought with this ID");
            return;
        }
        res.json(thoughtData);
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});

module.exports = router;