import axios from 'axios'

const apiKey = 'myOIxIGKwq8p7raktJU0VHsk587blPKN'

class NYTmodel {
  resource = 'https://api.nytimes.com/svc/books/v3'

  getBestSellersByCategory (category) {
    return axios(`${this.resource}/lists/current/${category}.json`, {
      method: 'get',
      params: {
        'api-key': apiKey
      }
    })
  }

  getPopulrList () {
    return axios(`${this.resource}/lists/names.json`, {
      method: 'get',
      params: {
        'api-key': apiKey
      }
    })
  }

}

export default new NYTmodel()

