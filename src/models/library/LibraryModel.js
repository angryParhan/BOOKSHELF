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

  edit (params) {
    return axios(`${this.resource}/edit`, {
      method: 'PUT',
      data: {
        ...params
      },
      withCredentials: true
    })
  }


  get (params) {
    return axios(`${this.resource}/get`, {
      method: 'GET',
      params: {
        ...params
      },
      withCredentials: true
    })
  }

  getLibrary (params) {
    return axios(`${this.resource}/get`, {
      method: 'GET',
      params: {
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
