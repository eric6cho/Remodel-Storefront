require('dotenv').config();

const s = require('./scripts/serverUtil.js');
const c = require('./scripts/constants.js');
const path = require('path');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../client/build'))); 

app.get('/api/data/pages', (req, res) => s.sendData(res,c.PAGES));
app.get('/api/data/products', (req, res) => s.sendData(res,c.PRODUCTS));
app.get('/api/data/articles', (req, res) => s.sendData(res,c.ARTICLES));
app.get('/api/data/users', (req, res) => s.sendData(res,c.USERS));
app.get('/api/data/styles', (req, res) => s.sendData(res,c.STYLES));
app.get('/api/data/saved', (req, res) => s.sendData(res,c.SAVED));
app.get('/api/data/nav', (req, res) => s.sendData(res,c.NAV));
app.get('/api', (req, res) => res.json({ message: 'Hello from server!' })); 
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'))); 

console.log('Server: Attempt to start server on port 3001');

app.listen(PORT, () => console.log(`Server: Listening on ${PORT}. Nice`));

/*
  index.js defines api paths and calls helper functions in serverUtils.js based on incoming api calls.
  index.js does not contain any logic for retrieving/parsing/packaging/sending data.
*/