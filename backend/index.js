// app.js
const express = require('express');
const cors = require('cors'); // Import the cors package
const dbConfig = require('./src/config/dbconfig');
const authRoutes = require('./src/routes/authRoutes');
const middleware = require('./src/middlewares/middleware');
const userDetailsRoutes = require('./src/routes/userDetailsRoutes');
const uploadsRoutes = require('./src/routes/uploadsRoutes');

const app = express();
const port = process.env.PORT || 5050;

app.use(express.json());

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  //'http://localhost:3000', // Allow only this origin
  // http://localhost:5173/sign-in
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow credentials (cookies, authorization headers, TLS client certificates)
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Use the CORS middleware with the specified options

app.use('/auth', authRoutes);

// Mount the userDetailsRoutes
app.use('/user-details', userDetailsRoutes);

// app.use('/users', userRoutes);
// Mount the uploadsRoutes
app.use('/uploads', uploadsRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Node.js with Express (connected to Oracle DB)!');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
