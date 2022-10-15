const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// import routes
// console.log('process.env.DB_CONNECT',process.env.DB_CONNECT);
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
mongoose.connect(process.env.DB_CONNECT,
{useNewUrlParser:true},
() => console.log('connected to mongo db'))
// Route middleware
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/posts',postRoute);

app.listen(3000, () => console.log('server up and running'));

