const express = require('express');
const cors = require('cors');
// const { connect } = require('mongoose');
require('dotenv').config();

// const { DB_USERNAME, DB_PASSWORD, DB_CLUSTER, DB_NAME, PORT } = process.env;
const {  PORT } = process.env;

const cashRoutes = require('./Routes/cashRoutes');

const { notFound ,errorHandler} = require('./middleware/errorMiddleware');



const {connectToDatabase} = require("./Middleware/db")
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



app.listen(PORT, async () => {
      console.log(`Server running on http://localhost:${PORT}`);
      
      // Connect to the database and log the connection status
      try {
        await connectToDatabase();
      } catch (err) {
        console.error('Exiting application due to database connection error.');
        process.exit(1); // Exit the app if the database connection fails
      }
});
       