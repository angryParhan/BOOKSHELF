const uuid = require('uuid')
const { connection } = require('../utils/connectionPool')
const errorHandler  = require('../utils/errorHandler')
const callProcedure  = require('../utils/callDBProcedure')

const library = {
  create (req, res) {
    connection.then(() => {
      const lib_id = uuid.v4()
      callProcedure('createLibrary', [lib_id, req.body.lib_id, req.body.name, req.body.description, req.body.visible, req.body.artwork])
        .then(() => res.send({ lib_id }))
        .catch(e => errorHandler(res, e))
    })
  },
  add (req, res) {
    if (!req.body.lib_id || !req.body.book_id) {
      return errorHandler(res, 'Bad request!')
    }
    connection
      .query(`INSERT INTO bookshelf.library_book (book_id, library_id) VALUES (${req.body.book_id}, ${req.body.lib_id});`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  }
}

module.exports = library
