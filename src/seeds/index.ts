import connection from '../config/connection.js'; // Import the MongoDB connection
import { User, Thought } from '../models/index.js'; // Import the User and Thought models

// Start a timer to track the seeding process.
console.time('seeding');

// Listen for the 'open' event on the database connection.  This ensures that
// the code only runs *after* a successful connection to the database.
connection.once('open', async () => {

    // Check if the "users" collection exists.
    let userCheck = await connection.db?.listCollections({ name: 'users' }).toArray();
    if (userCheck?.length) {
        // If the "users" collection exists, drop it to ensure a clean seed.
        await connection.dropCollection('users');
    }

    // Check if the "thoughts" collection exists.
    let thoughtCheck = await connection.db?.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck?.length) {
        // If the "thoughts" collection exists, drop it.
        await connection.dropCollection('thoughts');
    }

    // Initialize empty arrays to hold the user and thought data.  While they are populated later,
    // they aren't actually used in the seeding process itself.  They are just displayed in the console.
    const users: any[] = [];
    const thoughts: any[] = [];

    // Define the user data to be seeded.  This is an array of user objects.
    const seedUsers = [
        { username: 'jorge_m', email: 'jorge.montes@example.com' },
        { username: 'mike_p', email: 'mike.perez@example.com' },
    ];

    // Push the seedUsers array into the users array.  This is redundant and the 
    // pushed array is never used.  It's likely a leftover from previous code.
    users.push(seedUsers);

    // Define the thought data to be seeded.
    const seedThoughts = [
        { thoughtText: 'This is Jorge\'s first thought!', username: 'jorge_m' },
        { thoughtText: 'This is Mike\'s first thought!', username: 'mike_p' },
    ];

    // Similar to the users array, this push is redundant.
    thoughts.push(seedThoughts);

    // Insert the user data into the "users" collection using insertMany.  This
    // efficiently inserts multiple documents at once.
    await User.insertMany(seedUsers);
    console.log('Users seeded:', seedUsers);

    // Insert the thought data into the "thoughts" collection.
    await Thought.insertMany(seedThoughts);
    console.log('Thoughts seeded:', seedThoughts);

    // Display the user and thought data in a table in the console.  Again, this
    // uses the original, nested arrays, not the actual data inserted.
    console.table(users);
    console.table(thoughts);

    // End the timer and log the seeding time.
    console.timeEnd('seeding');

    // Exit the process.  This is important because the connection.once('open')
    // handler keeps the process running.  Without process.exit(), the script
    // would hang indefinitely after seeding completes.
    process.exit(0);
});