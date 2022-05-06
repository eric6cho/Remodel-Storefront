const fs = require('fs');
const d = require('./dataUtil.js');

// end file and url variable and function definitions

const productDataFile = './server/data/products.json';
const articleDataFile = './server/data/articles.json';
const userDataFile = './server/data/users.json';
const styleDataFile = './server/data/styles.json';
const pageDataFile = './server/data/pages.json';
const savedDataFile = './server/data/saved.json';

const productCount = 24;
const articleCount = 6;
const styleCount = 10;


const getFileData = async (file,isJson=true) => new Promise (resolve => {

  const checkIfFileExists = async file => new Promise(resolve => fs.stat(file, (err, stat) => resolve(!err)));

  const fileNullCheck = file => (!file || file===undefined || file.length==0 || file=='{}');
  
  const readDataFromFile = async (file,isJson=true) => new Promise(resolve => { 
    let fileData = null;
    fs.readFile(file, 'utf8', (err, fileString) => {
      if (!err && !fileNullCheck(fileString)) 
        fileData = isJson ? JSON.parse(fileString) : fileString;
      resolve(fileData);
    });
  });
  
  checkIfFileExists(file).then(result =>
    readDataFromFile(file,isJson).then(fileData => 
      resolve(fileData)
    )
  )
});  


const writeDataToFile = async (file,data) => new Promise(resolve => 
  fs.writeFile(file, JSON.stringify(data), err => resolve(data)));

// end file and url variable and function definitions


// start api call helper function definitions

const getProductData = async (req,res) => new Promise (resolve => {
  let file = productDataFile;
  getFileData(file).then(fileData=>{
    if(!fileData) {
      fileData = d.generateProductData(productCount)
      writeDataToFile(file,fileData);
    }
    resolve(fileData);
  });
});


const getArticleData = async (req,res) => new Promise (resolve => {
  let file = articleDataFile;
  getFileData(file).then(fileData=>{
    if(!fileData) {
      fileData = d.generateArticleData(articleCount)
      writeDataToFile(file,fileData);
    }
    resolve(fileData);
  });
});

const getUserData = async (req,res) => new Promise (resolve => {
  let file = userDataFile;
  getFileData(file).then(fileData=>{
    if(!fileData) {
      fileData = d.generateUserData()
      writeDataToFile(file,fileData);
    }
    resolve(fileData);
  });
});


const getStyleData = async (req,res) => new Promise (resolve => {
  let file = styleDataFile;
  getFileData(file).then(fileData=>{
    if(!fileData) {
      fileData = d.generateStyleData(styleCount)
      writeDataToFile(file,fileData);
    }
    resolve(fileData);
  });
});


const getPageData = async (req,res) => new Promise (resolve => {
  let file = pageDataFile;
  getFileData(file).then(fileData=>{
    if(!fileData) {
      fileData = d.generatePageData();
      writeDataToFile(file,fileData);
    }
    resolve(fileData);
  });
});


const getSavedData = async (req,res) => new Promise (resolve => {
  let file = savedDataFile;
  getFileData(file).then(fileData=>{
    if(!fileData) {
      fileData = d.generateSavedData();
      writeDataToFile(file,fileData);
    }
    resolve(fileData);
  });
});

// start serverUtil class definition

let serverUtil = class {

  sendPageData=(req,res)=>getPageData(req,res).then(data=>res.json({message:data}));

  sendProductData=(req,res)=>getProductData(req,res).then(data=>res.json({message:data}));
  
  sendArticleData=(req,res)=>getArticleData(req,res).then(data=>res.json({message:data}));
 
  sendUserData=(req,res)=>getUserData(req,res).then(data=>res.json({message:data}));

  sendStyleData=(req,res)=>getStyleData(req,res).then(data=>res.json({message:data}));

  sendSavedData=(req,res)=>getSavedData(req,res).then(data=>res.json({message:data}));

}

module.exports = new serverUtil();

/*
  serverUtil.js is meant to be a helper class for the api routing in index.js

  It allows api calls to be one liners that call serverutils

  serverUtils is responsible for:
    accessing and retrieving data from requests, files, and urls
    packaging parsed data into responses
    writing updated data to files
    sending packaged responses to the client

  serverUtils is not responsible for:
    processing / parsing data
    generating new data in charts
*/

// end serverUtil class definition