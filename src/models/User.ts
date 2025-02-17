import { Schema, model, Document } from 'mongoose';

// Interface defining the structure of a User document.  Extends the Mongoose Document interface.
interface IUser extends Document {
    username: string; // User's username
    email: string; // User's email address
    thoughts: Schema.Types.ObjectId[]; // Array of ObjectIds referencing Thought documents
    friends: Schema.Types.ObjectId[]; // Array of ObjectIds referencing User documents (for the friends relationship)
}

// Define the Mongoose schema for the User model.  A schema describes the structure
// and validation rules for the data that will be stored in the database collection.
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String, // Data type is String
            unique: true, // Ensures that each username is unique in the database
            required: true, // This field is required (cannot be empty)
            trim: true, // Automatically removes leading and trailing whitespace from the username
        },
        email: {
            type: String, // Data type is String
            unique: true, // Ensures that each email is unique in the database
            required: true, // This field is required
            match: [/.+@.+\..+/, 'Please fill a valid email address'], // Regular expression for email validation
        },
        thoughts: [{
            type: Schema.Types.ObjectId, // Data type is ObjectId (a unique identifier for a document in MongoDB)
            ref: "Thought" // This creates a reference to the "Thought" model. It tells Mongoose that this ObjectId
                           // refers to a document in the "thoughts" collection.  This is what enables population.
        }],
        friends: [{
            type: Schema.Types.ObjectId, // Data type is ObjectId
            ref: "User" // This creates a reference to the "User" model itself, enabling a self-referential
                         // relationship.  It means the ObjectIds in this array refer to other User documents.
        }]
    },
    {
        toJSON: { // Options for how the document is converted to JSON
            virtuals: true, // Include virtual properties (like friendCount) in the JSON output
        },
        id: false, // Don't include the default Mongoose _id field in the JSON (we might have our own ID)
    }
);

// Define a virtual property called friendCount. 
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

// Create the User model using the schema.  The first argument ("user") is the name of the
// collection in the database (Mongoose will automatically pluralize it to "users").
// The second argument is the schema to use.
const User = model<IUser>("user", userSchema);

export default User; // Export the User model so it can be used in other parts of the application.