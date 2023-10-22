const express = require("express");
const { connectDB } = require('./db');
const { AuthRouter } = require("./Auth/authRouter");
const { BlogRouter } = require("./Blog/blogRouter");
// const dotenv = require('dotenv');

// dotenv.config()
const app = express();

app.use(express.json());

const port = process.env.PORT || 4600;

// routes
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/blogs', BlogRouter);


//connect to database
 connectDB();


app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
  });