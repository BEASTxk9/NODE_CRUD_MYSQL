// INSTALL PACKAGES
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');                                                // fetch database details from the .env file
const fs = require('fs');


// INITIALIZE PACKAGES
const app = express();                                                           // create a instance of express app
app.use(cors());                                                                 // call the instance and allow to take requests from any origin
dotenv.config();                                                                 // allow dotenv configuration


// CONNECT TO DATABASE
const connection = mysql.createConnection({                                      // connect the db details from the .env file
    host: process.env.MYSQL_ADDON_HOST,
    user: process.env.MYSQL_ADDON_USER,
    database: process.env.MYSQL_ADDON_DB,
    password:  process.env.MYSQL_ADDON_PASSWORD,
});                                                                   
connection.connect((err) => {                                                    // check db connection

    if(err){   

        console.error("Error connecting to db!");                                // will display if connection is not established
        throw new Error(err);

    } else{

     console.info("Connection established!");                                    // If connection is established check if data base is being used 

     connection.query(`USE ${process.env.MYSQL_ADDON_DB}`, (err) => {            // check if you are using the database 
        if(err){

            console.log("USE Database failed!");                                 // will display if the mysql query was not successful
            throw new Error(err);

        }else{

            console.log("USE Database successfull!");                           // if mysql query was successful create a table within the db being used
            connection.query(`
            CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            name VARCHAR(100),
            photo LONGBLOB
             );
             `, (err) => {
              if(err){
                console.log("Table was not created!");                          // will display if the mysql query was not successful
                throw new Error(err);
              } else{
                console.log("Table created!/exists");
              }
             }) ;            

        }});

    };
    
});


// 1. CREATE 
app.post('/api', (req, res) => {                                                  // set a post req when '/api' is called
    connection.query(`INSERT INTO users SET ?`, {                                 // set mysql query
        name: "Bob",
        photo: Buffer.from(fs.readFileSync("./image.jpg")),
    }, (err) => {                                                                    // return if err / if successful
        if (err){
            console.log("Data was not inserted!");
            throw new Error(err);
        } else {
            console.log("1 row was inserted!");
            res.end();                                                            // respond and end request
        };
    })
});
// !IMPORTANT USE THUNDER CLIENT VSC EXTENSION
//  run the local server and the request eg... "localhost:3000/api" ... in thunder client



// 2. READ
app.get('/api', (req, res) => {                                                    // set a get req when '/api' is called
    connection.query(`SELECT * FROM users`, (err, result) => {                     // set mysql query
      if(err){
        console.log("Fetching data failed");
        throw new Error(err);
      }  else{
        // set headers on the response
        // res.set("Content-disposition", 'inline; filename=' + "image.jpg");
        // res.set('Content-Type', 'image/jpeg');
      
        // res.send(result[0].photo);
        console.log(result);
        res.end();
      };
    })
});



// 3. UPDATE 
app.put('/api', (req, res) => {                                                     // set a put req when '/api' is called
    connection.query(`UPDATE users SET ? WHERE id = 1`, {                           // set mysql query
        name: "Tree",
        photo: Buffer.from(fs.readFileSync("./image.jpg")),
    }, (err) => {                                                                   // return if err / if successful
        if (err){
            console.log("Data was not updated!");
            throw new Error(err);
        } else {
            console.log("1 record was updated!");
            res.end();                                                              // respond and end request
        };
    })
});


// 4. DELETE
app.delete('/api', (req, res) => {
    connection.query('DELETE FROM users WHERE id = 2;', (err) => {
        if(err) {
            console.log("Record was not deleted/does not exist");
            throw new Error(err);
        } else{
            console.log("1 record deleted!");
            res.end();
        };
    })
});


// set local server to run on 3000
app.listen(3000);