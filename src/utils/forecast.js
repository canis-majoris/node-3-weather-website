const request = require("request");

const forecast = ([lat, lon, units = 'metric'] = [], callback) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=b6b73e82fee467ae5639f905f2f3549e`;

  request({ url: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      callback(error);
    } else if (body.error) {
      console.log(body.error);
    } else {
      callback(undefined, `${body.weather[0].description}, ${body.main.temp}${units === 'metric' ? '\u2103' : '\u2109'}`);
    }
  });
};

module.exports = forecast;
