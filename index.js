
const CLIENT_DIR = path.join( 'client') || process.env.CLIENT_DIR
const indexHtml = path.join(CLIENT_DIR+'/index.html')



import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";
import path from 'path'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.static(CLIENT_DIR));


app.use('/posts', postRoutes);
app.use("/user", userRouter);


app.get('/*',(req,res)=>{
    res.sendFile(indexHtml)
  })

// setup mongodb 
const connectionURL = "mongodb+srv://Sayam:sayamAlvi@cluster0.chzyy2x.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

// returns a promise 
mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));


