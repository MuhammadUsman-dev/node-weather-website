const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4d271f0096b58f2295feec4e586f240d&query=${lat},${long}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('could not connect with the location services', undefined);
    } else if (body.error) {
      callback('Invalid data entered, Could not get the location', undefined);
    } else {
      const { current } = body;
      console.log(current);
      callback(undefined, current);
    }
  });
};

module.exports = forecast;
