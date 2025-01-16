const express = require('express');
const cors = require('cors');
// const { connect } = require('mongoose');
require('dotenv').config();

// const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_NAME, PORT } = process.env;
const {  PORT } = process.env;

const cashRoutes = require('./Routes/cashRoutes');

const { notFound ,errorHandler} = require('./middleware/errorMiddleware');


const app = express();
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001',"http://localhost:3002"], // Specify your frontend origins
  credentials: true 
}));


app.use("/api/cash", cashRoutes);


// app.use("/api/posts", postRoutes);

app.use(notFound)
app.use(errorHandler)


// connect(MONGO_URI).then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }).catch((error) => { 
//   console.log('error', error);
// });

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  