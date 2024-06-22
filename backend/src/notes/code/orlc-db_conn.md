const express = require('express');
const oracledb = require('oracledb');

// Replace with your actual Oracle database credentials and connection details
const dbConfig = {
    user: 'HR',
    password: '123',
    connectString: 'localhost/xe'
};

const app = express();
const port = process.env.PORT || 5050; // Use environment variable or default to 3000

app.get('/users', (req, res) => {
    async function fetchDataCustomers() {
        try {
            const connection = await oracledb.getConnection({
                user: 'sys',
                password: '123',
                connectString: 'localhost/sys'
            });

            const result = await connection.execute('SELECT * FROM sys.USERS');
            return result;

        } catch (error) {
return error;
        }
    }
    fetchDataCustomers().then(dbRes=>{
        res.send(dbRes)
    })
    .catch(err=>{ 
        res.send(err)
    })
})



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
