const uuid = require('uuid')
const { connection } = require('../utils/connectionPool')
const errorHandler  = require('../utils/errorHandler')
const callProcedure  = require('../utils/callDBProcedure')
const updateQuery  = require('../utils/updateQuery')

const library = {
  create (req, res) {
    connection.then(() => {
      const lib_id = uuid.v4()
      callProcedure('createLibrary', [lib_id, req.body.lib_id, req.body.name, req.body.description, req.body.visible, req.body.artwork])
        .then(() => res.send({ lib_id }))
        .catch(e => errorHandler(res, e))
    })
  },
  delete (req, res) {
    if (!req.body.lib_id || !req.body.book_id) {
      return errorHandler(res, 'Bad request!')
    }
    connection
      .query(`DELETE bookshelf.libraries WHERE library_id='${req.body.book_id}';DELETE bookshelf.user_library WHERE library_id='${req.body.book_id}';`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  },
  edit (req, res) {
    if (!req.body.lib_id) {
      return errorHandler(res, 'Bad request!')
    }
    updateQuery({
      library_name: req.body.library_name
    }, `library_id='${req.body.lib_id}'`, 'libraries')
      .then(data => res.send({ success: true, data }))
      .catch(e => errorHandler(res, e))
  },
  add (req, res) {
    if (!req.body.lib_id || !req.body.book_id) {
      return errorHandler(res, 'Bad request!')
    }
    connection
      .query(`INSERT INTO bookshelf.library_book (book_id, library_id) VALUES (${req.body.book_id}, ${req.body.lib_id});`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  },
}

module.exports = library
