const uuid = require('uuid')
// const { connection } = require('../utils/connectionPool')
const errorHandler  = require('../utils/errorHandler')
const callProcedure = require('../utils/callDBProcedure')

const book = {
  create (req, res) {
    const book_id = uuid.v4()
    callProcedure('createBook', [book_id, req.body.uid, req.body.name, req.body.author, req.body.description, req.body.artwork])
      .then(() => res.send({ book_id }))
      .catch(e => errorHandler(res, e))
  },
}

module.exports = book
