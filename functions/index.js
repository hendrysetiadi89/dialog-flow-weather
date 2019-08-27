const functions = require("firebase-functions");
const axios = require("axios");
const { dialogflow, Suggestions, SimpleResponse } = require("actions-on-google");

const app = dialogflow();

app.intent("Ask weather", async (conv, params) => {
  let weather = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${
      params["city"]
    }&APPID=0ecdb4b8fe7ce82083227bb58dbb334a&lang=id`
  );

  var weatherDesc = "" + weather.data.weather[0].description
  if (weatherDesc.includes("hujan")) {
    var newParams = params
    newParams["weatherDesc"] = weatherDesc
    conv.followup("weather_rain", newParams)
  } else {
    return conv.ask(
      `Cuaca ${params["city"]} hari ini adalah ${
        weatherDesc
      }`
    );
  }
});

app.intent("Ask weather - rain - umbrela - yes", (conv, params) => {
  return conv.ask(
    `Saya akan memesan payung. Silakan tunggu.`
  );
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
