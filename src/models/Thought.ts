import { Schema, model, type Document } from "mongoose";
import reactionSchema from "./Reaction.js"; // Import the reaction schema

// Define the interface for the Thought document.  This helps with type checking.
interface IThought extends Document {
    thoughtText: String; // The text content of the thought
    createdAt: Schema.Types.Date; // The timestamp when the thought was created
    username: String; // The username of the user who created the thought
    reaction: Schema.Types.ObjectId[]; // Array of ObjectIds referencing reactions (see explanation below)
}

// Create the Mongoose schema for the Thought model.
const thoughtsSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String, // Data type is String
            required: true, // This field is required
            minlength: 1, // Minimum length of the thought text
            maxlength: 280, // Maximum length of the thought text
        },
        createdAt: {
            type: Date, // Data type is Date
            default: Date.now, // Default value is the current timestamp
        },
        username: {
            type: String, // Data type is String
            required: true, // This field is required
        },
        reaction: [reactionSchema] // Array of reaction subdocuments.  This is how you embed the reaction schema.
                                // The reactions are stored directly within the thought document.
    },
    {
        toJSON: {
            virtuals: true, // Include virtuals in the JSON output
            getters: true // Include getters in the JSON output
        },
        id: false, // Don't include the _id field in the JSON output
        timestamps: true // Automatically create and update createdAt and updatedAt fields
    }
);

// Define a virtual property called reactionCount.  Virtuals are properties that
// are not stored in the database but are computed on the fly.  In this case,
// reactionCount returns the number of reactions associated with a thought.
thoughtsSchema.virtual("reactionCount").get(function () {
    return this.reaction.length;
});

// Create the Thought model using the schema.  The first argument ("thought")
// is the name of the collection in the database (Mongoose will automatically
// pluralize it to "thoughts").  The second argument is the schema to use.
const Thought = model<IThought>("thought", thoughtsSchema);

export default Thought; // Export the Thought model