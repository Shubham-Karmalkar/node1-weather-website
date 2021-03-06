const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoibWFya3NrYXhlbCIsImEiOiJja3dyc3F1OTkwemZqMm9xb3NkMnp6a2JxIn0.WEQGowTLY5HHOGDiw16Eyw`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services", undefined);
      console.log(bosy.features);
    } else if (body.features.length == 0) {
      callback("Unable to find location. Try another location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
