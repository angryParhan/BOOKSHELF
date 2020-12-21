//https://www.googleapis.com/books/v1/volumes?q={search terms}
import axios from 'axios'


class GoogleBooksModel {
  resource = 'https://www.googleapis.com/books/v1'

  //q - searched value
  //startIndex - offset


  searchBook (searchedValue, offset) {
    return axios(`${this.resource}/volumes`, {
      method: 'get',
      params: {
        q: searchedValue,
        startIndex: offset
      }
    })
  }

}

export default new GoogleBooksModel()

