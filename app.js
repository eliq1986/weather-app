const express = require("express");
const axios = require("axios");
const pug = require("pug");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

const api_key = "DZz1ctMkfQw4h1Z8oues7E9Bbho3rGPC";
//const geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${api_key}&location=${encodeWithQuestionMark}`;


app.use(express.static('public'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'pug');

app.get("/", (req, res)=> {
  res.render("index");
});

app.post("/post", (req, res)=> {


// Future function
  const city = req.body.city;
  const zip = req.body.zip;
  const address = req.body.address;
  const state = req.body.state;

  const arr = `${address}, ${city}, ${state} ${zip}`;
  const encodedUrl = encodeURIComponent(arr);
  const temperature = axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${api_key}&location=${encodedUrl}`)
  .then((res) => {
   const lat = res.data.results[0].locations[0].displayLatLng.lat;
   const lng = res.data.results[0].locations[0].displayLatLng.lng;
   return axios.get(`https://api.darksky.net/forecast/61a25768875673d685669fff4010cc5f/${lat},${lng}`)

 }).then((tempData) => {
   const temp = tempData.data.currently.apparentTemperature
   res.render("result", {temp: temp});
 }).catch((err) => {
   console.log(err);
 });


});


app.listen(3000, ()=> {
  console.log("Server running on port 3000");
});
