import 'dotenv/config';
import express from 'express';
import sequelize from './config/database.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.send('Express server is running');
});

sequelize
  .authenticate()
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
