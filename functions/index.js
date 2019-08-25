const functions = require("firebase-functions");
const axios = require("axios");
const { dialogflow, Suggestions, SimpleResponse } = require("actions-on-google");

const app = dialogflow();

app.intent("Ask weather", async (conv, params) => {
  let weather = await axios.get(
    `http://api.openweathermap.org/data/2.5/weather?q=${
      params["city"]
    }&APPID=0ecdb4b8fe7ce82083227bb58dbb334a`
  );

  return conv.add(
    `The Weather of ${params["city"]} today is ${
      weather.data.weather[0].description
    }`
  );
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
