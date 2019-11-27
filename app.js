const express = require("express");
const path = require("path");
const fs = require('fs');

const port = process.env.PORT || 3000;

const app = express();

// app.set('views', path.join(__dirname, 'dist'));
// app.set('view engine', 'html');
app.use(express.static('dist'));

// var imageArr = [];
// fs.readdir('./src/images/frontPagePics', (err,images)=>{
//   images.forEach((image)=>{
//     imageArr.push(image);
//   });
//   return;
// });

// app.get('/', (req,res)=>{
//   res.render('index');
// });



app.listen(port, () => {
  console.log("The server is up and running my cool dude!");
});