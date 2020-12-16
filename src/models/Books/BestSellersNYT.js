import axios from 'axios'

const apiKey = 'myOIxIGKwq8p7raktJU0VHsk587blPKN'

class NYTmodel {
  resource = 'https://api.nytimes.com/svc/books/v3'
  resourceLocal = '//localhost:8090/api/book'

  getBestSellersByCategoryDev (category) {
    return axios(`${this.resource}/lists/current/${category}.json`, {
      method: 'get',
      params: {
        'api-key': apiKey
      }
    })
  }
  getBestSellersByCategory (category) {
    return axios(`${this.resourceLocal}/charts`, {
      method: 'get',
      params: {
        category
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

