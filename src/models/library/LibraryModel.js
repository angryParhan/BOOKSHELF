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

  add (params) {
    return axios(`${this.resource}/add`, {
      method: 'POST',
      data: {
        ...params
      },
      withCredentials: true
    })
  }

  delete (params) {
    return axios(`${this.resource}/delete`, {
      method: 'DELETE',
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

  get (params = {}) {
    return axios(`${this.resource}/get`, {
      method: 'GET',
      params: {
        ...params
      },
      withCredentials: true
    })
  }

  getAll (params = {}) {
    return axios(`${this.resource}/getAll`, {
      method: 'GET',
      params: {
        ...params
      },
      withCredentials: true
    })
  }

  getLatestLibraries (params) {
    return axios(`${this.resource}/latest`, {
      mathod: 'GET',
      params: {
        ...params
      },
      withCredentials: true
    })
  }

}

export default new LibraryModel()
