import express from "express";
// import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extented: true }));
app.use(cors());


app.use('/posts', postRoutes);
app.use("/user", userRoutes);


 const PORT = process.env.PORT || 5000;

 mongoose.set("strictQuery", false);
 mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => app.listen(PORT, () => console.log(`Server running on port:http://localhost:${PORT}`)))
 .catch((error) => console.log(`${error} did not connect`));
 


 
//  mongoose.set('useFindAndModify', false);
//  this make sure we dont get any warning





