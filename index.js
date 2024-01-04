
const CLIENT_DIR = path.join( 'client') || process.env.CLIENT_DIR
// const indexHtml = path.join(CLIENT_DIR+'/index.html')
const indexHtml = './client/index.html';



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
app.use(cors({
  origin: '*',
}));
app.use(express.static(CLIENT_DIR));


app.use('/posts', postRoutes);
app.use("/user", userRouter);


app.get('/', (req, res) => {
  res.send('Server running');
});

// setup mongodb 
const connectionURL = "mongodb+srv://pk:piyupiyu@cluster0.ytbqv46.mongodb.net/?retryWrites=true&w=majorityy";
const PORT = process.env.PORT || 5000;

// returns a promise 
mongoose.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));


