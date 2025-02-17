import { User } from '../models/index.js'; // Import the User model
import { Request, Response } from 'express'; // Import Express types

// Controller functions for user management

// GET /users - Retrieve all users
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find(); // Find all users in the database
        res.json(users); // Send the users as JSON response
    } catch (error: any) { // Catch any errors during the process
        res.status(500).json({ // Send a 500 Internal Server Error status
            message: error.message // Include the error message in the response
        });
    }
}

// POST /users - Create a new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body); // Create a new user using data from the request body
        res.json(user); // Send the created user as JSON response
    } catch (err) { // Catch any errors during the process
        res.status(500).json(err); // Send a 500 Internal Server Error status with the error details
    }
}

// GET /users/:userId - Retrieve a single user by ID
export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId }); // Find the user by ID from the request parameters

        res.json(user); // Send the user as JSON response

    } catch (err) { // Catch any errors during the process
        res.status(500).json(err); // Send a 500 Internal Server Error status with the error details
    }
}

// PUT /users/:userId - Update a user by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId }, // Find the user by ID
            {$set: req.body}, // Update the user with data from the request body
            {new: true, runValidators: true} // Return the updated user and run validators
        );

        res.json(user); // Send the updated user as JSON response
    } catch (err) { // Catch any errors during the process
        res.status(500).json(err); // Send a 500 Internal Server Error status with the error details
    }
}

// DELETE /users/:userId - Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId }); // Find and delete the user by ID


        res.json(user); // Send the deleted user (or null if not found) as JSON response - consider sending 204 No Content
    } catch (err) { // Catch any errors during the process
        res.status(500).json(err); // Send a 500 Internal Server Error status with the error details
    }
}