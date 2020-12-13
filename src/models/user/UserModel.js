import axios from 'axios'
class UserModel {
  resource = '//localhost:8090/api/auth'

  login (value = null, password = null, uid = null) {
    return axios(`${this.resource}/login`, {
      method: 'POST',
      data: {
        value,
        password,
        uid
      },
      withCredentials: true
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


  //value - login or email, field - user_login/user_email
  checkExistance (value, field) {
    return axios(`${this.resource}/check`, {
      method: 'POST',
      data: {
        value,
        field
      }
    })
  }

}

export default new UserModel()
