// const bcrypt = require('bcryptjs'); // Change the import to bcryptjs
// const jwt = require('jsonwebtoken');
// const oracledb = require('oracledb');
// const dbConfig = require('../config/dbconfig');
// // Load the dotenv library to access environment variables from a .env file
// require('dotenv').config();

// // Define the secret key
// const secretKey = process.env.ACCESS_TOKEN_SECRET;

// async function signup(req, res) {
//   try {
//     const { first_name, last_name, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const connection = await oracledb.getConnection(dbConfig);
//     const result = await connection.execute(
//       `INSERT INTO USERS (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)`,
//       { first_name, last_name, email, password: hashedPassword }
//     );
//     await connection.commit();

//     res.status(201).send('User created successfully');
//   } catch (error) {
//     console.error('Error creating user:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }

// async function login(req, res) {
//     try {
//       const { email, password } = req.body;
  
//       const connection = await oracledb.getConnection(dbConfig);
//       const result = await connection.execute(
//         `SELECT * FROM USERS WHERE email = :email`,
//         [email]
//       );
//       const user = result.rows[0];
  
//       if (!user) return res.status(404).send('User not found');
  
//       const hashedPasswordFromDB = user[4]; // Assuming password is the fifth column in the table
//       const validPassword = await bcrypt.compare(password, hashedPasswordFromDB);
  
//       if (!validPassword) return res.status(401).send('Invalid email or password');
  
//       const accessToken = jwt.sign({ email: user[3] }, secretKey); // Assuming email is the fourth column
//       res.json({ accessToken });
//     } catch (error) {
//       console.error('Error logging in:', error);
//       res.status(500).send('Internal Server Error');
//     }
//   }
  
// module.exports = {
//   signup,
//   login
// };
const bcrypt = require('bcryptjs'); // Change the import to bcryptjs
const jwt = require('jsonwebtoken');
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');
// Load the dotenv library to access environment variables from a .env file
require('dotenv').config();

// Define the secret key
const secretKey = process.env.ACCESS_TOKEN_SECRET;

async function signup(req, res) {
  try {
    const { first_name, last_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const connection = await oracledb.getConnection(dbConfig);

    // Check if the email already exists
    const emailCheckQuery = 'SELECT COUNT(*) AS count FROM USERS WHERE email = :email';
    const emailCheckResult = await connection.execute(emailCheckQuery, { email }, { outFormat: oracledb.OUT_FORMAT_OBJECT });
    if (emailCheckResult.rows[0].COUNT > 0) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Insert new user
    const insertUserQuery = `INSERT INTO USERS (first_name, last_name, email, password) VALUES (:first_name, :last_name, :email, :password)`;
    await connection.execute(insertUserQuery, {
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    await connection.commit();

    res.status(201).send('User created successfully');
  } catch (error) {
    if (error.code === 'ORA-00001') {
      // Unique constraint error
      res.status(409).json({ error: 'User already exists' });
    } else {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM USERS WHERE email = :email`,
      [email]
    );
    const user = result.rows[0];

    if (!user) return res.status(404).send('User not found');

    const hashedPasswordFromDB = user[4]; // Assuming password is the fifth column in the table
    const validPassword = await bcrypt.compare(password, hashedPasswordFromDB);

    if (!validPassword) return res.status(401).send('Invalid email or password');

    const accessToken = jwt.sign({ email: user[3] }, secretKey); // Assuming email is the fourth column
    res.json({ accessToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Internal Server Error');
  }
}



async function getAllUsers(req, res) {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM users`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getUserById(req, res) {
  const userId = req.params.userId;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM users WHERE user_id = :userId`,
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).send('Internal Server Error');
  }
}



module.exports = {
  signup,
  login,
  getAllUsers,
  getUserById
};
