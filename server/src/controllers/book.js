const uuid = require('uuid')
const { connection } = require('../utils/connectionPool')
const errorHandler  = require('../utils/errorHandler')
const callProcedure = require('../utils/callDBProcedure')
const token = require('../utils/token')
const chartsModel = require('../utils/chartsModel')

const book = {
  create (req, res) {
    const book_id = uuid.v4()
    callProcedure('createBook', [book_id, req.body.library_id, req.body.name, req.body.author, req.body.description, req.body.artwork])
      .then(() => res.send({ book_id }))
      .catch(e => errorHandler(res, e))
  },
  async get (req, res) {
    if (!req.body.library_id) {
      try {
        const decoded = token.decode((req.cookies||{}).token);
        if (decoded) {
          req.body.library_id = (req.body.uid || decoded.uid) + '-fav'
        }
      } catch (e) {
        console.error(e)
      }
    }
    const { query } = await connection
    query(`
    SELECT book_name FROM books as b, libraries as l, library_book as lb 
    WHERE lb.library_id = '${req.body.library_id}'
          AND lb.library_id = l.library_id 
          AND lb.book_id = b.book_id;
    `)
      .then((data) => res.send({ success: true, data1: data, ddd: 'ddd' }))
      .catch(e => errorHandler(res, e))
  },
  async add (req, res) {
    if (!req.body.library_id) {
      try {
        const decoded = token.decode((req.cookies||{}).token);
        if (decoded) {
          req.body.library_id = (req.body.uid || decoded.uid) + '-fav'
        }
      } catch (e) {
        console.error(e)
      }
    }
    if (!req.body.library_id || !req.body.book_id) {
      return errorHandler(res, 'Bad request!')
    }
    const { query } = await connection
    query(`INSERT INTO bookshelf.library_book (book_id, library_id) VALUES (${req.body.book_id}, ${req.body.lib_id});`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  },
  async charts (req, res) {
    let data = null
    try {
      data = (await chartsModel.getBestSellersByCategory(req.query.category)).data
      data.results.books = data.results.books.map(item => {
        item.id = item.primary_isbn10 + item.primary_isbn13 + (item.title||'').replace(/[ '"`]/g, '')
        return item
      })
    } catch (e) {
      return errorHandler(res, e, (e.response||{}).status)
    }
    if (!(req.cookies||{}).token) {
      return res.send(data);
    }
    try {
      const decoded = token.decode((req.cookies||{}).token);
      if (decoded) {
        req.body.uid = (req.body.uid || decoded.uid)
      }
    } catch (e) {
      console.error(e)
    }
    if (!req.body.library_id || !req.body.book_id) {
      return errorHandler(res, 'Bad request!')
    }
    const { query } = await connection
    query(`INSERT INTO bookshelf.library_book (book_id, library_id) VALUES (${req.body.book_id}, ${req.body.lib_id});`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  }
}

module.exports = book
