const axios = require('axios')
const apiKey = 'myOIxIGKwq8p7raktJU0VHsk587blPKN'

function NYTmodel () {
  return {
    resource: 'http://api.nytimes.com/svc/books/v3',
    getBestSellersByCategory (category) {
      return axios(`${this.resource}/lists/current/${category}.json`, {
        method: 'get',
        params: { 'api-key': apiKey }
      })
    },
      getPopularList () {
      return axios(`${this.resource}/lists/names.json`, {
        method: 'get',
        params: { 'api-key': apiKey }
      })
    }
  }
}

module.exports = NYTmodel()
