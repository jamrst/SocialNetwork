import { Schema, Types, type Document } from "mongoose";

// Define the interface for the Reaction document.  This helps with type checking
// and ensures that all Reaction documents have the required properties.
interface IReaction extends Document {
    reactionId: Schema.Types.ObjectId; // The ID of the reaction (automatically generated)
    reactionBody: String; // The text content of the reaction
    username: String; // The username of the user who created the reaction
    createdAt: Schema.Types.Date; // The timestamp when the reaction was created
}

// Create the Mongoose schema for the Reaction model.  A schema defines the
// structure of the documents that will be stored in the MongoDB collection.
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId, // The data type is an ObjectId (used by MongoDB for unique IDs)
            default: () => new Types.ObjectId() // Generate a new ObjectId by default
        },
        reactionBody: {
            type: String, // The data type is a String
            required: true, // This field is required
            maxlength: 280, // Maximum length of the reaction body (like a tweet)
        },
        username: {
            type: String, // The data type is a String
            required: true, // This field is required
        },
        createdAt: {
            type: Date, // The data type is a Date
            default: Date.now, // Set the default value to the current timestamp
        }
    },
    {
        toJSON: { // Options for how the document is converted to JSON
            getters: true // Include virtuals in the JSON output
        },
        id: false, // Don't include the _id field in the JSON output (it's redundant since we have reactionId)
        timestamps: true // Automatically create and update createdAt and updatedAt fields.  This is a shorthand for:
                       // createdAt: { type: Date, default: Date.now },
                       // updatedAt: { type: Date }
    }
);

export default reactionSchema; // Export the reaction schema so it can be used to create a Reaction model