import { Router } from 'express'; // Import the Express Router
import {
    getUsers, // Import the getUsers controller function
    createUser, // Import the createUser controller function
    getSingleUser, // Import the getSingleUser controller function
    updateUser, // Import the updateUser controller function
    deleteUser  // Import the deleteUser controller function
} from '../../controllers/user-controller.js'; // Import all user controller functions

// Create a new Express Router instance.  This router will handle all routes
// related to users.
const router = Router();

// Define routes for the root path ("/users" because this router is mounted at /users).

// This route handles GET requests to /users (gets all users) and POST requests
// to /users (creates a new user).  The .route() method allows you to chain
// multiple HTTP methods to the same path.
router.route('/')
    .get(getUsers) // Maps GET /users to the getUsers controller
    .post(createUser); // Maps POST /users to the createUser controller


// Define routes for paths with a userId parameter ("/users/:userId").

// This route handles GET requests to /users/:userId (gets a single user),
// PUT requests to /users/:userId (updates a user), and DELETE requests to
// /users/:userId (deletes a user).
router.route('/:userId')
    .get(getSingleUser)    // Maps GET /users/:userId to the getSingleUser controller
    .put(updateUser)    // Maps PUT /users/:userId to the updateUser controller
    .delete(deleteUser); // Maps DELETE /users/:userId to the deleteUser controller

// Export the router so it can be used by the main application or other routers.
 export default router;



