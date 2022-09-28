const request = require('postman-request')
require('dotenv').config()

const geocode = (address, callback) => {
    const geoKey = process.env.MAPBOX_KEY //'pk.eyJ1Ijoia2N2aW4iLCJhIjoiY2tlZDF4aGppMGIxZjJybW5oZG5kZ2VhcCJ9.AhJKvYaj1diXRjHr2sk-dQ'
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=' + geoKey + '&limit=1'
    request( { url: geocodeUrl, json: true }, (error, { body }) => {
        if (error) {
            callback('Error: Unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('Error: Unable to find location')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode