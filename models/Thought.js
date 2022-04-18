const {Schema, model, Types} = require("mongoose");

// Reaction schema
const reactionSchema = new Schema({
    reactionID: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // TODO: format date
        // get: dateCreated => {
        // }
    }
})

// Thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
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
    // array of nested documents created with reactionSchema
    reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }    
);

// TODO: Virtual to track reaction count
thoughtSchema.virtual("reactionCount").get(function() {
    return this.reactions.length;
});

// Create model
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;