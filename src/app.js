import express from 'express';
import logger from 'morgan';
import { sequelize } from '../models/index';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

// importing routes
import registerRouter from './routes/user';
import loginRouter from './routes/login';
import productRouter from './routes/product';
import cartRouter from './routes/cart';
import categoryRouter from './routes/category';
import checkoutRouter from './routes/checkout';

const app = express();

app.use(logger('combined'));
app.use(cookieParser());

// static folder
app.use('/images', express.static('../images'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'E-COMMERCE API Documentation',
      description: 'E-COMMERCE API Documentation',
      contact: {
        name: 'e-commerce',
      },
      server: `${process.env.SERVER_URL}`,
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

const port = process.env.PORT || 3000;

// calling middlewares
app.use(registerRouter);
app.use(loginRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(categoryRouter);
app.use(checkoutRouter);

// Listening to requests
app.listen(port, async () => {
  console.log(`Server running at ${port}...`);
  await sequelize.authenticate();
  console.log('Databse connected successfully');
});

export { app };
