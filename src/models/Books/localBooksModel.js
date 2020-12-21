import axios from 'axios'

class localBooksModel {
  resource = '//localhost:8090/api/book'
  addBook (params) {
    return axios(`${this.resource}/add`, {
      method: 'post',
      data: {
        ...params
      },
      withCredentials: true
    })
  }
  createBook (params) {
    return axios(`${this.resource}/create`, {
      method: 'post',
      data: {
        ...params
      },
      withCredentials: true
    })
  }
  getLibraryBooks (params = {}) {
    return axios(`${this.resource}/get`, {
      method: 'get',
      data: {
        ...params
      },
      withCredentials: true
    })
  }
}

export default new localBooksModel()
