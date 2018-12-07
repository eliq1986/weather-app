const express = require("express");
const axios = require("axios");
const pug = require("pug");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const formatString = require("./formatString");
const typeOfClothes = require("./typeOfClothes");

const app = express();
const api_key = "DZz1ctMkfQw4h1Z8oues7E9Bbho3rGPC";

//middleware
app.use(express.static('public'))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'pug');


app.get("/", (req, res)=> {
  res.render("index");
});




app.post("/post", (req, res)=> {
   const addressString = formatString.formatReq(req);

  const encodedUrl = encodeURIComponent(addressString);
   return axios.get(`http://www.mapquestapi.com/geocoding/v1/address?key=${api_key}&location=${encodedUrl}`)
  .then((res) => {
   const lat = res.data.results[0].locations[0].displayLatLng.lat;
   const lng = res.data.results[0].locations[0].displayLatLng.lng;
   return axios.get(`https://api.darksky.net/forecast/61a25768875673d685669fff4010cc5f/${lat},${lng}`)

 }).then((tempData) => {
   const temp = tempData.data.currently.apparentTemperature.toFixed(0);
   
   const clothes = typeOfClothes.clothesType(temp);

   res.render("result", {temp: temp, clothes: clothes})
 }).catch((err) => {
   console.log(err);
 });


});






app.listen(3000, ()=> {
  console.log("Server running on port 3000");
});
