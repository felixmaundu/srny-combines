// // dbConfig.js
const oracledb = require('oracledb');

const dbConfig = {
  user: 'sys',
  password: '123',
  connectString: 'localhost:1522/xe',
  privilege: oracledb.SYSDBA
};

module.exports = dbConfig;

// const oracledb = require('oracledb');
// const dbConfig = {
//   user: "sys",//process.env.DB_USER,
//   password: "123",//process.env.DB_PASSWORD,
//   connectString: "localhost:1522/xe",//process.env.DB_CONNECTSTRING
//   privilege: oracledb.SYSDBA
// };

// const pool = new oracledb.createPool(dbConfig);

// module.exports = pool;
