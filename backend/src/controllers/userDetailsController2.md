// controllers/userDetailsController.js
const oracledb = require('oracledb');
const dbConfig = require('../config/dbconfig');
const authMiddleware = require('../middlewares/middleware')
// Load the dotenv library to access environment variables from a .env file
require('dotenv').config();

// Define the secret key
// const secretKey = process.env.ACCESS_TOKEN_SECRET;

// const oracledb = require('oracledb');
// const dbConfig = require('../config/dbconfig');
const { BlobServiceClient } = require('@azure/storage-blob'); // Import Azure Blob Storage client

// Configure Azure Blob Storage connection (replace with your details)
const connectionString = process.env.SAS_TOKEN;//'<your_azure_storage_connection_string>';
const containerName = 'driversfiles'; // Name of the container for storing licenses

async function uploadDrivingLicense(licenseFile) {
  // Create a BlobServiceClient instance
  const blobServiceClient = new BlobServiceClient(connectionString);

  // Get a reference to the container
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Generate a unique filename for the license
  const fileName = `${Date.now()}-${licenseFile.originalname}`;

  // Create a blob client
  const blobClient = containerClient.getBlockBlobClient(fileName);

  // Upload the license file to Azure Blob Storage
  await blobClient.uploadData(licenseFile.buffer);

  // Return the URL of the uploaded license
  return `https://${containerName}.blob.core.windows.net/${fileName}`;
}

// async function createUserDetails(req, res) {
//   const userDetails = req.body;
//   let drivingLicenseUrl;

//   try {
//     if (req.files && req.files.drivingLicense) {
//       // Upload the driving license if present
//       drivingLicenseUrl = await uploadDrivingLicense(req.files.drivingLicense);
//       userDetails.drivingLicenseUrl = drivingLicenseUrl;
//     }

//     const connection = await oracledb.getConnection(dbConfig);
//     const result = await connection.execute(
//       `INSERT INTO user_details VALUES (:userId, :gender, :addressLine1, :addressLine2, :city, :state, :zipCode, :country, 
//         :drivingLicenseUrl, 
//         :drivingLicenseNumber,
        
//         :socialSecurityCardNumber,
//          :resumeUrl, :mobilePhoneNumber,
//           :supportiveDocuments
//         )`,
//       userDetails
//     );
//     await connection.commit();
//     res.status(201).send('User details created successfully');
//   } catch (error) {
//     console.error('Error creating user details:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }



async function getAllUserDetails(req, res) {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(`SELECT * FROM user_details`);
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
      `SELECT * FROM user_details WHERE user_id = :userId`,
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
      `INSERT INTO user_details VALUES (:userId, :gender, :addressLine1, :addressLine2, :city, :state, :zipCode, :country, :drivingLicenseUrl, :drivingLicenseNumber, 
        :socialSecurityCardNumber, :resumeUrl, :mobilePhoneNumber, :supportiveDocuments)`,
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
      `UPDATE user_details 
       SET gender = :gender, address_line_1 = :addressLine1, address_line_2 = :addressLine2, city = :city, 
           state = :state, zip_code = :zipCode, country = :country, driving_license_url = :drivingLicenseUrl, 
           driving_license_number = :drivingLicenseNumber, social_security_card_number = :socialSecurityCardNumber, 
           resume_url = :resumeUrl, mobile_phone_number = :mobilePhoneNumber, supportive_documents = :supportiveDocuments
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
      `DELETE FROM user_details WHERE user_id = :userId`,
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