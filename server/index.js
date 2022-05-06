
require('dotenv').config();

const server = require('./scripts/serverUtil.js');
const path = require('path');
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build'))); 

app.get('/api/data/pages', (req, res) => server.sendPageData(req,res));
app.get('/api/data/products', (req, res) => server.sendProductData(req,res));
app.get('/api/data/articles', (req, res) => server.sendArticleData(req,res));
app.get('/api/data/users', (req, res) => server.sendUserData(req,res));
app.get('/api/data/styles', (req, res) => server.sendStyleData(req,res));
app.get('/api/data/saved', (req, res) => server.sendSavedData(req,res));

app.get('/api', (req, res) => res.json({ message: 'Hello from server!' })); 
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'))); 

console.log('Server: Attempt to start server on port 3001');

app.listen(PORT, () => console.log(`Server: Listening on ${PORT}. Nice`));

/*
  index.js defines api paths and calls helper functions in serverUtils.js based on incoming api calls.
  index.js does not contain any logic for retrieving/parsing/packaging/sending data.

  Resources:

  Google Material Icons: https://fonts.google.com/icons
  CSS Gradient Generator: https://cssgradient.io/
  Heroku Deployed App: https://crypto-risk-react.herokuapp.com/
*/