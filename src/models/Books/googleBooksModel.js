//https://www.googleapis.com/books/v1/volumes?q={search terms}
import axios from 'axios'


class GoogleBooksModel {
  resource = 'https://www.googleapis.com/books/v1'

  //q - searched value
  //startIndex - offset


  getBestSellersByCategory (params) {
    return axios(`${this.resource}/volumes`, {
      method: 'get',
      params: {
        ...params
      }
    })
  }

}

export default new GoogleBooksModel()

