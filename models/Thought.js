const {Schema, model} = require("mongoose");

thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        // TODO: Validate length 1-280 characters
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdDate => {
            // TODO: Format the date
        }
    },
    username: {
        type: String,
        required: true
    },
    // TODO: Reactions: 
    // array of nested documents created with reactionSchema
});

// TODO: Virtual to track reaction count

// Create model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;