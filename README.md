# Social Network API

## Description

The **Social Network API** is a back-end application that enables the creation and management of users, thoughts, reactions, and friendships. It leverages **Node.js**, **Express.js**, and **MongoDB** with **Mongoose** as the ORM to handle large-scale unstructured data efficiently. This API provides essential functionality for a social networking platform, including user management, thoughts sharing, reactions, and friend connections.

---

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
- [Technologies Used](#technologies-used)
- [Features](#features)

---
## Video Walkthrough

https://app.screencastify.com/v2/manage/videos/guC7USOiX7sMQ83FIIDP 


## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jamrst/SocialNetwork

2. Navigate to the project directory:
    ```bash
  cd SocialNetwork

3. Install Dependencies:
    ```bash
    npm install

4. Build the application:
    ```bash
    npm run build

5. Seed the database (optional):
    ```bash
    npm run seed

6. Start the application: 
    ```bash
    npm run start

## Usage

1. Start the server:
    ```bash
    npm run start

2. Use a tool like Insomnia or Postman to test the API endpoints.

3. The API runs on http://localhost:3001.

## API Endpoints

1. User Routes
   
    GET /api/users: Retrieve all users.
    GET /api/users/:id: Retrieve a single user by ID.
    POST /api/users: Create a new user.
        Body:
            json
        {
        "username": "test_user",
        "email": "test_user@example.com"
        }
    PUT /api/users/:id: Update a user's information.
    DELETE /api/users/:id: Delete a user by ID.


## Technologies Used

1. Node.js: JavaScript runtime for server-side development.

2. Express.js: Framework for building RESTful APIs.

3. MongoDB: NoSQL database for storing unstructured data.

4. Mongoose: ODM for MongoDB.

5. JavaScript: Primary programming language.

6. Insomnia: Tool for testing API endpoints.

## Features

1. Users can be created, updated, deleted, and queried.

2. Thoughts (posts) can be created, updated, deleted, and queried.

3. Reactions (comments) can be added and removed from thoughts.

4. Users can add and remove friends from their friend list.

5. Mongoose validation ensures data integrity.

6. Error handling for duplicate entries and missing data.