const { connection } = require('../utils/connectionPool')
const errorHandler  = require('../utils/errorHandler')

const user = {
  async addBook (req, res) {
    if (!req.body.book_id || (!req.body.uid && !req.body.lib_id)) {
      return errorHandler(res, 'Bad request!')
    } else if (!req.body.lib_id) {
      req.body.lib_id = req.body.uid + '-fav'
    }
    if ((await connection.query(`SELECT * FROM libraries WHERE library_id = '${req.body.lib_id}'`)).rows.length) {
      return errorHandler(res, 'Bad request!')
    } else if ((await connection.query(`SELECT * FROM books WHERE book_id = '${req.body.book_id}'`)).rows.length) {
      return errorHandler(res, 'Bad request!')
    }
    connection
      .query(`INSERT INTO bookshelf.library_book (book_id, library_id) VALUES ('${req.body.book_id}', '${req.body.lib_id}');`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  },
  async addLibrary (req, res) {
    if (!req.body.uid || req.body.lib_id) {
      return errorHandler(res, 'Bad request!')
    }
    if ((await connection.query(`SELECT * FROM users WHERE user_id = '${req.body.uid}'`)).rows.length) {
      return errorHandler(res, 'Bad request!')
    } else if ((await connection.query(`SELECT * FROM libraries WHERE library_id = '${req.body.library_id}'`)).rows.length) {
      return errorHandler(res, 'Bad request!')
    }
    connection
      .query(`INSERT INTO bookshelf.user_library (user_id, library_id) VALUES ('${req.body.uid}', '${req.body.lib_id}');`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  },
}

module.exports = user
