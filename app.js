const express = require('express');

const fs = require('fs');

const request = require('request');

var app = express();

const hbs = require('hbs');

const yargs = require('yargs')

const port = process.env.PORT || 8080;

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

///

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

///

hbs.registerHelper('message', (text) => {
    return text.toUpperCase();
})

/*app.use((request, response, next) => {
    var time = new Date().toString();
    //console.log(`${time}: ${request.method} ${request.url}`);
    var log = `${time}: ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to log message');
        }
    });
    next();
});*/

/*app.use((request, response, next) => {
    response.render('maintenance.hbs', {
        title: 'Under maintenance'
    });
});*/

app.get('/', (request, response) => {
    // response.send('<h1>Hello Express!</h1>');
    response.render('main.hbs', {
        title: 'Main page',
        year: new Date().getFullYear(),
        welcome: 'Welcome to the homepage!',
    })
});

app.listen(port, () => {
    console.log(`Server is up on the port ${port}`);
});

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        year: new Date().getFullYear(),
        welcome: 'Welcome to the about page!'
    });
});

var jsonData = require('./public/new.json');
picofmars = jsonData.mars[0].marsimage

app.get('/nasa', (request, response) => {
    response.render('nasa.hbs', {
        title: 'NASA page',
        year: new Date().getFullYear(),
        welcome: 'Welcome to the NASA page',
        img1: picofmars,
        img2: 'https://images-assets.nasa.gov/image/PIA18906/PIA18906~thumb.jpg'
    });
});

app.get('/404', (request, response) => {
    response.send({
        error: 'Page not found'
    })
})