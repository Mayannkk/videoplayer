import express, { urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// app.use is always use when any middleware is using or configuration is happening
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// this use to limit the json, so very heayv bot file can not failed our server
app.use(
  express.json({
    limit: '16kb',
  })
);

// It is used to encode the url, where to use + sign % sign, all of that can be configure here.
// extended means you can pass object inside object(nested objects)
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// static configuration is use to store file, folder in our own server like in a public folder(like public assets).
app.use(express.static('public'));

// cookie parser is used to get access of user's browser cookie so server can get and add(CRUD) the cookies. only server can access those cookies.
app.use(cookieParser());

// Importing user routes, always import routes after the configuration of middlewares
import userRoutes from './routes/user.routes.js';

app.use('/api/v1/users', userRoutes);

export { app };
