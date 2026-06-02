import 'dotenv/config';
import express from 'express';
import { sequelize } from './models/index.js';
import catalogsRouter from './routes/catalogsRoute.js'
import unitsRouter from './routes/unitsRoute.js'
import productRouter from './routes/productsRoute.js'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TestShop API',
      version: '1.0.0',
      description: 'API documentation for TestShop',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js', './controllers/*.js', './models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/catalogs', catalogsRouter)
app.use("/units", unitsRouter)
app.use("/products", productRouter)


sequelize
  .authenticate()
  .then(function() {
    return sequelize.sync()
  })
  .then(function() {
    app.listen(port, function() {
      console.log(`Server running on http://localhost:${port}`);
      console.log('Database connected');
    });
  })
  .catch(function(error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });
