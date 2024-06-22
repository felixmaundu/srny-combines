const express = require('express');
const oracledb = require('oracledb');

// Oracle database configuration
const dbConfig = {
  user: 'sys',
  password: '123',
  connectString: 'localhost:1522/xe',
  privilege: oracledb.SYSDBA
};

// Create Express application
const app = express();
const port = process.env.PORT || 5050; // Use environment variable or default to 5050

// Function to connect to the Oracle database
async function connectToDatabase() {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    console.log('Successfully connected to Oracle Database');

    // Your database operations using the 'connection' object would go here
    // Example query (replace with your actual query)
    const result = await connection.execute(`SELECT * FROM sys.USERS`);
    console.log(result.rows);
  } catch (err) {
    console.error('Error connecting to Oracle Database:', err);
  } finally {
    // Close the connection if it was established
    if (connection) {
      try {
        await connection.close();
        console.log('Database connection closed');
      } catch (err) {
        console.error('Error closing database connection:', err);
      }
    }
  }
}

// Call the connection function on startup
connectToDatabase();

// Define route for the root endpoint
app.get('/', (req, res) => {
  res.send('Hello from Node.js with Express (connected to Oracle DB)!');
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
