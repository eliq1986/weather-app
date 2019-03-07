const express = require("express");
const axios = require("axios");
const pug = require("pug");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const chalk = require("chalk");


const formatAddress = require("./helperFunctions/formatAddress");
const getTypeOfClothes = require("./helperFunctions/typeOfClothes");

const app = express();
const api_key = "DZz1ctMkfQw4h1Z8oues7E9Bbho3rGPC";

//middleware
app.use(express.static('public'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'pug');



// Home route
app.get("/", (req, res)=> {
  res.render("index");
});

app.get("*",(req,res)=> {
  res.render("404");
});

app.post("/post", (req, res)=> {
   const addressString = formatAddress(req);

   const encodedUrl = encodeURIComponent(addressString);
   return axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${api_key}&location=${encodedUrl}`)

  .then(({ data }) => {

   const latitude = data.results[0].locations[0].displayLatLng.lat;
   const longitude = data.results[0].locations[0].displayLatLng.lng;
   return axios.get(`https://api.darksky.net/forecast/61a25768875673d685669fff4010cc5f/${latitude},${longitude}`)

 }).then(({ data }) => {
   const currentTemp = data.currently.apparentTemperature.toFixed(0);

   const clothesToWear = getTypeOfClothes(currentTemp);
   res.render("result", { currentTemp, clothesToWear })
 }).catch((err) => {
   console.log(err);
 });


});






app.listen(3000, ()=> {
  console.log(chalk.inverse.cyan("Server running on port 3000"));
});
