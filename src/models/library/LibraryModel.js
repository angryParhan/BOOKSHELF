import axios from 'axios'

class LibraryModel {
  resource = '//localhost:8090/api/library'

  create (params) {
    return axios(`${this.resource}/create`, {
      method: 'POST',
      data: {
        ...params
      },
      withCredentials: true
    })
  }

  edit () {
    return axios(`${this.resource}/edit`, {
      method: 'POST',
      withCredentials: true
    })
  }


  get (params) {
    return axios(`${this.resource}/get`, {
      method: 'POST',
      data: {
        ...params
      }
    })
  }

  getAll (value, field) {
    return axios(`${this.resource}/getAll`, {
      method: 'POST',
      data: {
        value,
        field
      }
    })
  }

}

export default new LibraryModel()
