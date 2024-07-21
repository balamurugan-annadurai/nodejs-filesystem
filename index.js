// Import necessary modules
import express from "express";
import cors from "cors";
import fs from "fs";
import { format } from "date-fns";
import dotenv from "dotenv";
dotenv.config();

const app = express();  // Initialize Express application
app.use(cors());        // Enable CORS for all routes

// Root endpoint to provide information about available endpoints
app.get('/', (req, res) => {
    res.status(200).json(
        {
            "End point to create a text file": "/createfile",
            "End point to retrieve all text files": "/showfiles"
        }
    );
})

// Endpoint to create a text file with current timestamp as filename
app.get('/createfile', (req, res) => {
    let today = format(new Date(), 'dd-MM-yyyy-HH-mm-ss');
    const filePath = `TimeStamp/${today}.txt`;
    fs.writeFileSync(filePath, `${today}`, 'utf8');

    res.status(200).json({
        "msg": "Text file added",
        "fileContent": `${today}`,
        "fileName": `${today}`
    })
})

// Endpoint to retrieve all text file names from the 'TimeStamp' folder
app.get('/showfiles', (req, res) => {
    
    let folderPath = 'TimeStamp';
    let data = fs.readdirSync(folderPath);
    
    res.status(200).send(data)
})

// Start the server, listening on the specified port from environment variables
app.listen(process.env.PORT, () => {
    console.log("App is listening on PORT", process.env.PORT);
})