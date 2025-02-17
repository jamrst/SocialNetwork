import mongoose from 'mongoose';

// Connect to the MongoDB database.
mongoose.connect('mongodb://127.0.0.1:27017/SocialNetwork_DB')

// Export the database connection object.  
export default mongoose.connection;