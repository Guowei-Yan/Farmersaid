import express from 'express';
import mysql from 'mysql';
import fs from 'fs';
import csv from 'fast-csv';

import config from '../config';

const router = express.Router();
var responseMsg = null;

/**
 * Create a connection handler for the mysql database server
 * 
 * @param {string} host The hostname of the database server
 * @param {string} user The username of the database server
 * @param {string} password The password of the database server
 * @param {string} database The database name
 * 
 */
const connectionHandler = mysql.createConnection({
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.db_name
});

/**
 * Connect to the mysql database server
 * 
 * @param {object} err The error object
 * 
 */

connectionHandler.connect((err) => {
    if (err) 
        return err
    else {
        return connectionHandler;
    }
});

/**
 * Function to retrieve the regional statistics injury and fatality statistics used by the VicMap component
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/injury-fatality", (request, response) => {

    connectionHandler.query('SELECT * FROM injuries_fatalities', (error, results, fields) => {
        if (error)
            response.json({
                error
            })
        else
            response.json({
                results
            });
    });

});

/**
 * Function to retrieve the injury and fatality statistics used by the VicMap component
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/get-checklist-questionnaire", (request, response) => {

    connectionHandler.query('SELECT * FROM questions_before_checklist', (error, results, fields) => {
        if (error)
            response.json({
                error
            })
        else
            response.json({
                results
            });
    });

});


/**
 * Function to retrieve the injury statistics based on age-group and body part used by the DonutInjury component
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/injury-data", (request, response) => {

    connectionHandler.query('SELECT * FROM injury_data', (error, results, fields) => {
        if (error)
            response.json({
                error
            })
        else
            response.json({
                results
            });
    });

});

/**
 * Function to retrieve a list of categories for the SafetyMeasures component
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/getCategories", (request, response) => {
    connectionHandler.query('SELECT * FROM category', (error, results, fields) => {
        if (error)
            response.json({
                error
            })
        else
            response.json({
                results
            });
    })
});

/**
 * Function to retrieve checklist items for a particular category for the ChecklistItem component
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/getChecklistItems/:category_id", (request, response) => {
    connectionHandler.query(`SELECT * FROM questions WHERE category_id=${request.params.category_id}`, (error, results, fields) => {
        if (error)
            response.json({
                error
            })
        else
            response.json({
                results
            });
    })
});

/**
 * Function to retrieve the values of the severity dropdowns used by the PriorityForm component
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/getSeverityQs", (request, response) => {
    connectionHandler.query(`SELECT * FROM severity_text`, (error, results, fields) => {
        if (error)
            response.json({
                error
            })
        else
            response.json({
                results
            });
    })
});

/**
 * Function to retrieve the values of the frequency dropdowns used by the PriorityForm component
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/getFrequencyQs", (request, response) => {
    connectionHandler.query(`SELECT * FROM frequency_text`, (error, results, fields) => {
        if (error)
            response.json({
                error
            })
        else
            response.json({
                results
            });
    })
});

/**
 * Function to refresh a specific table upon receiving the updated the datasets fromthe data sources
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/refresh_table/:table_name", (request, response) => {
    
    const table_name = request.params.table_name;
    let source_file = null;
    let que = null;
    let select_que = null;
    let insert_query = null;
    let drop_query = null;


    switch(table_name) {
        case 'injuries_fatalities':

            source_file = __dirname+ "/../public/data/final1.csv";
            que = `create table injuries_fatalities(
                ind INT NOT NULL,
                lga VARCHAR(100) NOT NULL,
                number int(40) NOT NULL,
                cause VARCHAR(100) NOT NULL,
                PRIMARY KEY ( lga )
                );`;
            select_que = "SELECT * FROM injuries_fatalities ";
            insert_query = "INSERT INTO injuries_fatalities (ind,lga,number,cause) VALUES ?";
            drop_query = `DROP TABLE IF EXISTS injuries_fatalities`;

            break;
        
        case 'injury_data':

            source_file = __dirname+ "/../public/data/final2.csv";
            que = `create table injury_data(
                age VARCHAR(100) ,
                body varchar(100) ,
                injury VARCHAR(100)
                );`;
            
            select_que = "SELECT * FROM injury_data ";
            insert_query = "INSERT INTO injury_data (age,body,injury) VALUES ?";
            drop_query = `DROP TABLE IF EXISTS injury_data`;

            break;
        
        default:
            break;
    }

    let stream = fs.createReadStream(source_file);
    let myData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            myData.push(data);
        })
        .on("end", function () {
            myData.shift();

            connectionHandler.query(drop_query);
            connectionHandler.query(que);
            let query = insert_query;
            connectionHandler.query(query, [myData], (error, response) => {
                responseMsg = error || "success";
            });

        });
    
    stream.pipe(csvStream);
    
    response.json({
        responseMsg
    })
});

/**
 * Function to retrieve the home page statistics displayed under each category
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/getHomePageStats", (request, response) => {
    connectionHandler.query(
        `SELECT count_tractor/count_all AS percentage_tractor, count_fall/count_all AS percentage_fall, count_toxic/count_all AS percentage_chemical, count_general/count_all AS percentage_else
        FROM (SELECT count(*) AS count_all FROM farmersaid.injuries_fatalities WHERE cause != "No fatality in this area") AS T1
        JOIN (SELECT count(*) AS count_tractor FROM farmersaid.injuries_fatalities WHERE cause = "Tractor Accident") AS T2
        JOIN (SELECT count(*) AS count_fall FROM farmersaid.injuries_fatalities WHERE cause = "Fall") AS T3
        JOIN (SELECT count(*) AS count_toxic FROM farmersaid.injuries_fatalities WHERE cause = "Toxic") AS T4
        JOIN (SELECT count(*) AS count_general FROM farmersaid.injuries_fatalities WHERE cause != "Toxic" AND cause != "Fall" AND cause != "Tractor Accident" AND cause != "No fatality in this area") AS T5;`, (error, results, fields) => {
        if (error)
            response.json({
                error
            })
        else
            response.json({
                results
            });
    })
});

/**
 * Function to update the database table with the default severity and frequency values used by the PriorityForm component
 * 
 * @param {object} request The request object
 * @param {object} response The response object
 * 
 * 
 */

router.get("/updateTable", (request, response) => {
    const question_id = request.query.id;
    const freq = request.query.fre;
    const sev = request.query.se;
    let que = 'UPDATE farmersaid.questions SET default_freq = ?, default_sev = ? WHERE question_id=?'
    connectionHandler.query(
        que,[freq,sev,question_id], (error, results) => {
        if (error)
            response.json({
                error
            })
        else
            response.json({
                results
            });
    })

});


export default router;