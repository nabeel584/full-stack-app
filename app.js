const express = require('express');
const Product = require('./models/Product');
const dbConnection = require('./dbConnection/dbConnection');
const productRoute = require('./routes/productsRoutes');
const userRoute = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));

//setting up the database

//Setting up view engine

app.set('view engine', 'ejs');

//setting up the routes

app.use(express.json());
app.use(cookieParser());

app.use('/api/products/', productRoute);
app.use('/api/users/', userRoute);

app.use((req, res, next) => {
  const { method, path } = req;
  console.log('Method: ' + method, '>>>>>>Path: ' + path);
  next();
});

dbConnection();
//app listen
app.listen(3000, () => {
  console.log('server is listening for port 3000');
});

// app.get('/products/create', (req, res) => {
//   res.render('create');
// });
// app.get('/products/update', (req, res) => {
//   res.render('update');
// });

// homePage

// app.get('/users', (req, res) => {
//   const user = new User({
//     firstName: 'muhammad',
//     lastName: 'nabeel',
//     //   body: 'This is my new phone',
//   });

//   user
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log('Error', err);
//     });
// });
