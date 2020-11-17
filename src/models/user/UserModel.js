import axios from 'axios'

class UserModel {
  resource =  '//localhost:8090/api/auth'

  login (value, password) {
    return axios(`${this.resource}/login`, {
      method: 'POST',
      data: {
        value,
        password
      }
    })
  }

  register(login, user_name, password) {
    return axios(`${this.resource}/registration`, {
      method: 'POST',
      data: {
        login,
        user_name,
        password
      }
    })
  }

}

export default new UserModel()
