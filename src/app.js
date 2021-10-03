const path = require('path');
const express = require('express');

const hbs = require('hbs');
const forcast = require('./utils/forecast');
const geocode = require('./utils/geocode');
const request = require('request');

const app = express();

// define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory with express
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Muhammad Usman Shuja',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about me',
    name: 'Muhammad Usman Shuja',
  });
});

app.get('/help', (res, req) => {
  req.render('help', {
    title: 'help',
    helptext: 'help page',
    name: 'Muhammad Usman Shuja',
  });
});

app.get('/weather', (req, res) => {
  const address1 = req.query.address;
  if (!address1) {
    return res.send({
      error: 'Please provide address',
    });
  }
  geocode(address1, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forcast(
      latitude,
      longitude,
      (error, { weather_descriptions, temperature, feelslike }) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: `${weather_descriptions[0]}. Today is ${temperature} degrees in ${address1} but it feels like ${feelslike} degrees`,
          location,
          address: address1,
        });
      }
    );
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({ products: [req.query.search] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Muhammad Usman Shuja',
    error: 'help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Muhammad Usman Shuja',
    error: 'Page Not Found',
  });
});

app.listen(3000, () => {
  console.log('Server started');
});
