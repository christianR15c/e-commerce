import express from 'express';
import logger from 'morgan';
import { sequelize } from '../models/index';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

// importing routes
import registerRouter from './routes/user';
import loginRouter from './routes/login';
import productRouter from './routes/product';
import cartRouter from './routes/cart';
import categoryRouter from './routes/category';

const app = express();

app.use(logger('combined'));

// static folder
app.use('/images', express.static('../images'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// calling middlewares
app.use(registerRouter);
app.use(loginRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(categoryRouter);

// Listening to requests
app.listen(port, async () => {
  console.log(`Server running at ${port}...`);
  await sequelize.authenticate();
  console.log('Databse connected successfully');
});

export { app };
