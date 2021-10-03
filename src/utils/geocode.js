const request = require('request');
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidXNtYW5zaHVqYSIsImEiOiJja3RzaDBwaTAxZzB4Mm9tcHdxNDNreWlzIn0.I8Vum_uEwu_p-oYcCMl-xw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('unable to connect to the location services', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
