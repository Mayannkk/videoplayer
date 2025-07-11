// require('dotenv').config({ path: './env' });
import dotenv from 'dotenv';
import connectToDatabase from './db/index.js';
import { app } from './app.js';

dotenv.config({ path: './env' });

const port = process.env.PORT || 8080;

connectToDatabase()
  .then(() => {
    app.on('error', (err) => {
      console.error('ERRR: ', err);
      throw err;
    });
    app.listen(port, () => {
      console.log('Server is running at PORT:', port);
    });
  })
  .catch((err) => {
    console.error('MongoDB Connection Failed!!!', err);
  });

/*
    * This is the first approach to connect to MongoDB using Mongoose, directly in the index.js file.
    * In this approach, we connect to MongoDB and start the server in the same file.
    * This is a simple and straightforward way to set up the server and database connection.
    * However, it is not the best practice for larger applications.
    
import express from 'express';
const app = express();
const port = process.env.PORT || 4000;

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on('error', (error) => {
      console.log('ERR: ', error);
      throw error;
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();
*/
