const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6869f07941a78635a46bd0da606c568d&query=${latitude},${longitude}&units=f`;
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect weather services", undefined);
    } else if (body.error) {
      callback("Unable to find Location. Try another one", undefined);
    } else {
      callback(undefined, {
        weather_description: body.current.weather_descriptions[0],
        current: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
