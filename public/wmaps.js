const request = require('request');

const fs = require('fs');

/*request({
    url:'https://maps.googleapis.com/maps/api/geocode/json?address=Canada&key=AIzaSyDIvDPyPUMnra7zMRtV1E3AT9RnP6V06mw',
    json: true
}, (error, response, body) => {*/



request({
    url:'https://images-api.nasa.gov/search?q=Mars',
    json: true
}, (error, response, body) => {

    var obj = {
        mars: []
     };

    obj.mars.push({marsimage: body.collection.items[1].links[0].href});

    console.log(body.collection.items[1].links[0].href);
    fs.writeFileSync('./public/new.json', JSON.stringify(obj));
});

// `https://restcountries.eu/rest/v2/name/${encodeURIComponent(name)}`

/*request({
    url:'http://api.openweathermap.org/data/2.5/weather?q=Vancouver&APPID=937d1c6c68dd6c4e6b52a22c506212e6',
    json: true
}, (error, response, body) => {

    var obj = {
        vancouver: []
     };

    obj.vancouver.push({temperature: body.main.temp, windspeed: body.wind.speed});

    console.log('Temperature for Vancouver:', body.main.temp);
    console.log('Wind speed for Vancouver:', body.wind.speed);
    fs.writeFileSync('./public/new.json', JSON.stringify(obj));
});*/




