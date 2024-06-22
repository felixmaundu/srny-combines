// controllers/uploadsController.js
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');

async function getUserUploads(req, res) {
  const userId = req.params.userId;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM uploads_for_users WHERE user_id = :userId`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user uploads:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function uploadUserFiles(req, res) {
  const userId = req.params.userId;
  const uploadData = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO uploads_for_users VALUES (:userId, :uploadData)`,
      [userId, JSON.stringify(uploadData)]
    );
    await connection.commit();
    res.status(201).send('Files uploaded successfully');
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteUserUploads(req, res) {
  const userId = req.params.userId;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `DELETE FROM uploads_for_users WHERE user_id = :userId`,
      [userId]
    );
    await connection.commit();
    res.status(200).send('User uploads deleted successfully');
  } catch (error) {
    console.error('Error deleting user uploads:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getUserUploads,
  uploadUserFiles,
  deleteUserUploads
};
