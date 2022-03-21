require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DB_URL,
    dialect: 'postgres',
  },
  test: {
    url: process.env.DB_TEST,
    dialect: 'postgres',
  },
  production: {
    url: process.env.DB_PRODUCTION,
    dialect: 'postgres',
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    // user: 'lunsjbvickphwk',
    // password:
    //   '56d1b3ea4213fda6266c293ace5f5d0793cb252a4a58b44ea4e6b527febf5a4e',
    // database: 'd21309r3sem79',
    // port: 5432,
    // host: 'ec2-3-216-221-31.compute-1.amazonaws.com',
    // ssl: false,
    // dialect: 'postgres',
  },
};
