const express = require('express');
const bodyParser = require('body-parser');
var router = express.Router();
//const uuid = require('uuid/v4');
//const uuid = require('uuid/dist/v4');
const { v4: uuidv4 } = require('uuid');
var mongoose   = require('mongoose');
//require('Models/Posts.js');
var MDB_product = require('./Models/storeProducts');
mongoose.connect('mongodb+srv://Sudhamsu:ybNBokzDDRyBqVhc@products.tpuhd.mongodb.net/BooksStore?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }); // connect to our database

// mongodb+srv://Sudhamsu:<password>@products.tpuhd.mongodb.net/<dbname>?retryWrites=true&w=majority
//adding the /comments route to our /api router
router.route('/storeProducts')
 //retrieve all comments from the database
 .get(function(req, res) {
 //looks at our Comment Schema
 MDB_product.find(function(err, storeProducts) {
 if (err)
 res.send(err);
 //responds with a json object of our database comments.
 res.json(storeProducts)
 });
 })
 
 //post new comment to the database
 .post(function(req, res) {
 var mdb_product = new MDB_product({username:req.body.username, password:req.body.password}); //{title:req.body.title, price:req.body.price}
 //body parser lets us use the req.body
//  mdb_product.username = req.body.username;
//  mdb_product.password = req.body.password;

 mdb_product.save(function(err) {
 if (err)
 res.send(err);
 res.json({ message: 'Userdetails successfully added!' });
 });
 })
 //api for Delete data from database  
 .post(function(req, res) {
  mdb_product.remove({ _id: req.body.id }, function(err) {  
             if(err){  
                 res.send(err);  
             }  
             else{    
                    res.send({data:"Record has been Deleted..!!"});             
                }  
         });  
 }); 
 var MDB_book = require('./Models/storeBooks');
mongoose.connect('mongodb+srv://Sudhamsu:ybNBokzDDRyBqVhc@products.tpuhd.mongodb.net/BooksStore?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }); // connect to our database

// mongodb+srv://Sudhamsu:<password>@products.tpuhd.mongodb.net/<dbname>?retryWrites=true&w=majority
//adding the /comments route to our /api router
router.route('/storeBooks')
 //retrieve all comments from the database
 .get(function(req, res) {
 //looks at our Comment Schema
 MDB_book.find(function(err, storeBooks) {
 if (err)
 res.send(err);
 //responds with a json object of our database comments.
 res.json(storeBooks)
 });
 })
 //post new comment to the database
 .post(function(req, res) {
 var mdb_book = new MDB_book({image:req.body.image, title:req.body.title, price:req.body.price}); //{title:req.body.title, price:req.body.price}
 //body parser lets us use the req.body
//  mdb_product.username = req.body.username;
//  mdb_product.password = req.body.password;

mdb_book.save(function(err) {
 if (err)
 res.send(err);
 res.json({ message: 'Books successfully added!' });
 });
 })
 //api for Delete data from database  
 .post(function(req, res) {
  mdb_book.remove({ _id: req.body.id }, function(err) {  
             if(err){  
                 res.send(err);  
             }  
             else{    
                    res.send({data:"Record has been Deleted..!!"});             
                }  
         });  
 }); 
const app = express();
const apiPort = 5000;

const DUMMY_PRODUCTS = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
      );
    
    next();
  });
app.get('/', (req, res) => {
    res.send('Hello World!')
});
// GET method route
 app.get('/products',  (req, res, next)=> {
     res.status(200).json({products : DUMMY_PRODUCTS})
 });
  
  // POST method route
app.post('/product', (req, res, next)=> {
    const {title, price, image} = req.body;

    if(!title || title.trim().length === 0 || !price || price <= 0){
        return res.status(422).json({message : 'Invalid input, please enter a valid title and price.'});
    }
   
 const createdProduct = {
     id: uuidv4(), 
     title,  
     price,
     image
 };

 DUMMY_PRODUCTS.push(createdProduct);
 res.status(201).json({message : 'created new product.', products : createdProduct});
});

//Use our router configuration when we call /api
app.use('/api', router);
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));