const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');
const authMiddleware = require('../middlewares/middleware');

async function getAllUserDetails(req, res) {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM credential_for_users`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function getUserDetails(req, res) {
  const userId = req.params.userId;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM credential_for_users WHERE user_id = :userId`,
      [userId]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('User details not found');
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function createUserDetails(req, res) {
  const userDetails = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `INSERT INTO credential_for_users VALUES (:userId, :gender, :addressLine1, :addressLine2, :city, :state,
        :zipCode, :country, :drivingLicenseNumber, 
             :socialSecurityCardNumber, :resumeUrl, :mobilePhoneNumber)`,
      userDetails
    );
    await connection.commit();
    res.status(201).send('User details created successfully');
  } catch (error) {
    console.error('Error creating user details:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function updateUserDetails(req, res) {
  const userId = req.params.userId;
  const updatedDetails = req.body;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `UPDATE credential_for_users 
         SET gender = :gender, address_line_1 = :addressLine1, address_line_2 = :addressLine2, city = :city, 
             state = :state, zip_code = :zipCode, country = :country, driving_license_number = :drivingLicenseNumber, 
             social_security_card_number = :socialSecurityCardNumber, resume_url = :resumeUrl, mobile_phone_number = :mobilePhoneNumber
       WHERE user_id = :userId`,
      { ...updatedDetails, userId }
    );
    await connection.commit();
    res.status(200).send('User details updated successfully');
  } catch (error) {
    console.error('Error updating user details:', error);
    res.status(500).send('Internal Server Error');
  }
}

async function deleteUserDetails(req, res) {
  const userId = req.params.userId;
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `DELETE FROM credential_for_users WHERE user_id = :userId`,
      [userId]
    );
    await connection.commit();
    res.status(200).send('User details deleted successfully');
  } catch (error) {
    console.error('Error deleting user details:', error);
    res.status(500).send('Internal Server Error');
  }
}




module.exports = {
  getAllUserDetails,
  getUserDetails,
  createUserDetails,
  updateUserDetails,
  deleteUserDetails
};
