import express from 'express'; // Import the Express.js framework
import routes from './routes/index.js'; // Import the API routes from the routes/index.js file
import db from './config/connection.js'; // Import the database connection from config/connection.js

// Define the port the server will listen on. 
const PORT = process.env.PORT || 3001; // Use environment variable PORT if available, otherwise default to 3001

// Create an Express application instance.  This is the core object that
// handles incoming requests and responses.
const app = express();

// Middleware to parse incoming URL-encoded data.  
app.use(express.urlencoded({ extended: true }));

// Middleware to parse incoming JSON data.  This is essential for handling API
// requests that send data in JSON format.
app.use(express.json());

// Use the imported routes.  This mounts all the routes defined in the
// routes/index.js file under the root path ("/").  
app.use(routes);

// Connect to the MongoDB database.  The `db.once('open', ...)` ensures that
// the server starts *only after* a successful connection to the database
// has been established. This prevents the server from trying to handle
// database requests before the connection is ready.
db.once('open', () => {
    // Start the server and listen on the specified port.
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`); // Log a message to the console
    });
});

