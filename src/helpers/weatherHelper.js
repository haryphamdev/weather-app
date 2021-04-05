import axios from 'axios';

export const getLocation = async (query) => {
    return new Promise(async (resolve, reject) => {
        await axios.get(`https://www.metaweather.com/api/location/search/?query=${query}`)
            .then(function (response) {
                if (response && response.data && response.data.length > 0) {
                    let location = response.data[0];
                    //woeid: Where On Earth IDentifier
                    resolve(location.woeid);
                }
                resolve()
            })
            .catch(function (error) {
                // handle error
                reject(error);
            })
    })

}

export const getWeather = async (query) => {
    return new Promise(async (resolve, reject) => {
        let locationId = await getLocation(query);
        if (locationId) {
            await axios.get(`https://www.metaweather.com/api/location/${locationId}/`)
                .then(function (response) {
                    if (response && response.data) {
                        let predict = response.data.consolidated_weather;
                        let weatherStateName = predict[0].weather_state_name;
                        let weatherStateAbbr = predict[0].weather_state_abbr;
                        let temperature = predict[0].the_temp;
                        resolve({
                            weatherStateName, weatherStateAbbr, temperature
                        })
                    } else {
                        // console.log('without data weather')
                        resolve()
                    }

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                    reject(error)
                })

        } else {
            resolve()
            // console.log('without data locationId')
        }
    })
}

export const getImageBackgroundSrc = (weatherName) => {
    let listWeather = {
        'sn': require('./../../assets/weather/sn.png'), //snow
        'sl': require('./../../assets/weather/sl.png'), //Sleet
        'h': require('./../../assets/weather/h.png'), //Hail
        't': require('./../../assets/weather/t.png'), //Thunderstorm
        'hr': require('./../../assets/weather/hr.png'), //Heavy Rain
        'lr': require('./../../assets/weather/lr.png'), //Light Rain
        's': require('./../../assets/weather/s.png'), //Showers
        'hc': require('./../../assets/weather/hc.png'), //Heavy Cloud
        'lc': require('./../../assets/weather/lc.png'), //Light Cloud
        'c': require('./../../assets/weather/c.png'), //Clear

    };

    return listWeather[weatherName];
}


