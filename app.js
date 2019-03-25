const express = require('express');

const fs = require('fs');

var app = express();

const hbs = require('hbs');

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

app.use((request, response, next) => {
    var time = new Date().toString();
    //console.log(`${time}: ${request.method} ${request.url}`);
    var log = `${time}: ${request.method} ${request.url}`;
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to log message');
        }
    });
    next();
});

/*app.use((request, response, next) => {
    response.render('maintenance.hbs', {
        title: 'Under maintenance'
    });
});*/

app.get('/', (request, response) =>  {
    // response.send('<h1>Hello Express!</h1>');
    response.render('main.hbs', {
        about: 'http://localhost:8080/info',
        weather: 'http://localhost:8080/weather',
        title: 'Main page',
        year: new Date().getFullYear(),
        welcome: 'Welcome to the homepage!',
    })
});

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
});

app.get('/info', (request, response) => {
    response.render('about.hbs', {
        title: 'About page',
        year: new Date().getFullYear(),
        welcome: 'Welcome to the about page!'
    });
});

app.get('/weather', (request, response) => {
    response.render('weather.hbs', {
        title: 'Weather page',
        year: new Date().getFullYear(),
        welcome: 'Welcome to the weather page',
        weatherinfo: '{"vancouver":[{"temperature":277.76,"windspeed":9.8}]}'
    });
});

app.get('*', (request, response) => {
    response.send({
    error: 'Page not found'
    })
})