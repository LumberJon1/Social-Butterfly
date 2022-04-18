const {Schema, model} = require("mongoose");

// Define the user schema and fields
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email address.`
        }
    },
    thoughts: [
        // Reference the Thought models
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

//Create virtual
userSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

// Create the model based on the schema
const User = model("User", userSchema);

module.exports = User;