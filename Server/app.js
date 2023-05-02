const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cardRouter = require('./Routes/cardRoutes');
const userRouter = require('./Routes/userRoutes');

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cookieParser());

app.use('/catalog', cardRouter);
app.use('/user', userRouter);

module.exports = app;
