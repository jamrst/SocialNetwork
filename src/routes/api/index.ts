import { Router } from 'express'; // Import the Express Router
import userRoutes from './user-routes.js'; // Import the user routes from user-routes.js

// Create a new Express Router instance.  Routers are used to define groups
// of related routes.  This router will handle all routes related to the API.
const router = Router();

// Mount the user routes under the /users path.  This means that any requests
// to URLs starting with /users will be handled by the routes defined in
// the userRoutes module.  
router.use('/users', userRoutes);

// Export the router so it can be used by the main application.  This allows
// the main app to include all the API routes defined in this file.
export default router;