const request = require('postman-request')
require('dotenv').config()

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=' + process.env.WEATHERSTACK_KEY + '&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            console.log(error)
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback(body.error, undefined)
        } else {
            const current = body.current
            callback(undefined, `${current.weather_descriptions[0]}: It is currently ${current.temperature} degrees. It feels like ${current.feelslike} degrees. The humidity is ${current.humidity}%.`)
        }
    })
}

module.exports = forecast