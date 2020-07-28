const request = require("request");

const geocode = (address, callback) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY2FuaXNtYWpvcmlzIiwiYSI6ImNrY2FjYmxuMjF0Z3YzMWxtZnd3bm1yN2gifQ.x8zjQQbHmjLxe7i4ofmn_w`;
  
  request({ url: geocodeUrl, json: true }, (error, { body }) => {
    if (error) {
      callback(error);
    } else if (!body.features || body.features.length === 0) {
      callback('Forecast not found');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
