const request = require('request');

const forecast = (address,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=76693545b4367bfdf4f85fbed7e6e410&query=${address.latitude},${address.longitude}`;
    
    request({url, json : true}, (error,{body}) => {
        if(error){
            callback('Not able to connect to weather service', undefined);
        } else if(body.error){
            callback('Location not found, try another search!', undefined);
        } else{
            const data = body.current;
            callback(undefined, {
            description : data.weather_descriptions[0],
            temperature : data.temperature,
            feelslike : data.feelslike,
            location : address.location
            });
        }
    })

};

module.exports = forecast;