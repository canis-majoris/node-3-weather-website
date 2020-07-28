const request = require("request");

const forecast = ([lat, lon, units = 'metric'] = [], callback) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=b6b73e82fee467ae5639f905f2f3549e`;

  request({ url: weatherUrl, json: true }, (error, { body }) => {
    if (error) {
      callback(error);
    } else if (body.error) {
      console.log(body.error);
    } else {
      const unitC = units === 'metric' ? '\u2103' : '\u2109';
      callback(undefined, `${body.weather[0].description}, ${body.main.temp}${unitC} (feels like ${body.main.feels_like}${unitC}, high: ${body.main.temp_max}${unitC}, low: ${body.main.temp_min}${unitC})`);
    }
  });
};

module.exports = forecast;
