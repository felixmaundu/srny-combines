
// //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// // controllers/userDetailsController.js
// const oracledb = require('oracledb');
// const dbConfig = require('../config/dbconfig');
// const azureStorage = require('@azure/storage-blob'); // Import Azure Storage SDK

// const blobService = azureStorage.createBlobService(
//   'driversfiles',
//   'https://driversfiles.blob.core.windows.net/;QueueEndpoint=https://driversfiles.queue.core.windows.net/;FileEndpoint=https://driversfiles.file.core.windows.net/;TableEndpoint=https://driversfiles.table.core.windows.net/;SharedAccessSignature=sv=2022-11-02&ss=bfqt&srt=o&sp=rwdlacupiytfx&se=2024-05-15T00:32:04Z&st=2024-05-14T16:32:04Z&spr=https&sig=qssL1m2cWD3zszvjW%2FNXmtjuljEVUK7V84NkYnq4iIc%3D'

// );

// async function createUserDetails(req, res) {
//   const userDetails = req.body;
//   try {
//     // Upload driving license picture to Azure Blob Storage
//     const drivingLicenseUrl = await uploadToAzureBlobStorage(req.file);

//     // Update userDetails object with drivingLicenseUrl
//     userDetails.drivingLicenseUrl = drivingLicenseUrl;

//     // Insert user details into the database
//     const connection = await oracledb.getConnection(dbConfig);
//     const result = await connection.execute(
//       `INSERT INTO user_details VALUES (:userId, :gender, :addressLine1, :addressLine2, :city, :state, :zipCode, :country, :drivingLicenseUrl, :drivingLicenseNumber, :socialSecurityCardNumber, :resumeUrl, :mobilePhoneNumber, :supportiveDocuments)`,
//       userDetails
//     );
//     await connection.commit();
//     res.status(201).send('User details created successfully');
//   } catch (error) {
//     console.error('Error creating user details:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }

// async function updateUserDetails(req, res) {
//   const userId = req.params.userId;
//   const updatedDetails = req.body;
//   try {
//     // Upload driving license picture to Azure Blob Storage
//     const drivingLicenseUrl = await uploadToAzureBlobStorage(req.file);

//     // Update updatedDetails object with drivingLicenseUrl
//     updatedDetails.drivingLicenseUrl = drivingLicenseUrl;

//     // Update user details in the database
//     const connection = await oracledb.getConnection(dbConfig);
//     const result = await connection.execute(
//       `UPDATE user_details 
//        SET gender = :gender, address_line_1 = :addressLine1, address_line_2 = :addressLine2, city = :city, 
//            state = :state, zip_code = :zipCode, country = :country, driving_license_url = :drivingLicenseUrl, 
//            driving_license_number = :drivingLicenseNumber, social_security_card_number = :socialSecurityCardNumber, 
//            resume_url = :resumeUrl, mobile_phone_number = :mobilePhoneNumber, supportive_documents = :supportiveDocuments
//        WHERE user_id = :userId`,
//       { ...updatedDetails, userId }
//     );
//     await connection.commit();
//     res.status(200).send('User details updated successfully');
//   } catch (error) {
//     console.error('Error updating user details:', error);
//     res.status(500).send('Internal Server Error');
//   }
// }

// // Function to upload file to Azure Blob Storage
// function uploadToAzureBlobStorage(file) {
//   return new Promise((resolve, reject) => {
//     const blobName = 'driving-license-' + Date.now() + '.jpg'; // Generate unique blob name
//     const containerName = 'driversfiles'; // Azure Blob Storage container name

//     blobService.createBlockBlobFromLocalFile(
//       containerName,
//       blobName,
//       file.path,
//       (error, result, response) => {
//         if (error) {
//           reject(error);
//         } else {
//           // Get URL of the uploaded blob
//           const drivingLicenseUrl = blobService.getUrl(containerName, blobName);
//           resolve(drivingLicenseUrl);
//         }
//       }
//     );
//   });
// }

// module.exports = {
//   getAllUserDetails,
//   getUserDetails,
//   createUserDetails,
//   updateUserDetails,
//   deleteUserDetails
// };
