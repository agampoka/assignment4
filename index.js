import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { student } from "./models/student.js"

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.argv.PORT || 3000;

app.get("/", async(req, res) => res.send('Connection Extablished sucessfully...'));

app.post('/student', async (req,res) => {
    const {first_name, last_name, date_of_birth, school} = req.body;
    const newStudent = student({
        first_name:first_name, 
        last_name : last_name, 
        date_of_birth: date_of_birth, 
        school: school
    });

    const result = await newStudent.save();
    res.send(`New Student Created Successfully.\n ${result}`)

});

app.get("/students", async (req, res) => {
    const result = await student.find({});
    res.json(result);
  });
  

mongoose.connect(process.env.MONGO_DB_CON_STRING, (error) => {
    if (error) { // if we get an error, log it out to the console
      return console.log(`Failed to connect to MongDB ${error}`);
    } else { // if connection is successful... start the server
      console.log("MongoDB is connected");
      // start the server to listen to incoming request
      // on the specified PORT
      app.listen(PORT, () => {
        console.log(`Server is up and running 🚀🚀🚀 on PORT: ${PORT}`);
      });
    }
  });