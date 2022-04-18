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
        // Validate email matching
    },
    thoughts: [
        // Reference the Thought models
        // {
        //     type: Schema.Types.ObjectId,
        //     ref: "Thought"
        // }
    ],
    //friends: [userSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

//Create virtual
// userSchema.virtual("friendCount").get(function() {
//     return this.friends.length;
// });

// Create the model based on the schema
const User = model("User", userSchema);

module.exports = User;