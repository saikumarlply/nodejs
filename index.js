import express from 'express'
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
// import routes
// console.log('process.env.DB_CONNECT',process.env.DB_CONNECT);
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js';
import userRoute from './routes/user.js';
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true},
() => console.log('connected to mongo db'))
// Route middleware
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/posts',postRoute);
app.use('/api/user',userRoute);

app.listen(3000, () => console.log('server up and running'));

