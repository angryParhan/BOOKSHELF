import axios from 'axios'
class UserModel {
  resource = '//localhost:8090/api/auth'

  login (params) {
    return axios(`${this.resource}/login`, {
      method: 'POST',
      data: {
        ...params
      },
      withCredentials: true
    })
  }

  // login,
  // user_name,
  // password
  register(params) {
    return axios(`${this.resource}/registration`, {
      method: 'POST',
      data: {
        ...params
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
