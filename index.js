import express from "express";
import cors from "cors";
import fs from "fs";
import { format } from "date-fns";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json(
        {
            "End point to create a text file": "/createfile",
            "End point to retrieve all text files": "/showfiles"
        }
    );
})

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

app.get('/showfiles', (req, res) => {
    
    let folderPath = 'TimeStamp';
    let data = fs.readdirSync(folderPath, 'utf8');
    
    res.status(200).send(data)
})

app.listen(process.env.PORT, () => {
    console.log("App is listening on PORT", process.env.PORT);
})