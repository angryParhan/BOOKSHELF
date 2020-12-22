const uuid = require('uuid')
const { connection } = require('../utils/connectionPool')
const dbSelection = require('../config/dbSelection.json')
const errorHandler  = require('../utils/errorHandler')
const callProcedure = require('../utils/callDBProcedure')
const token = require('../utils/token')
const chartsModel = require('../utils/chartsModel')

const book = {
  async create (req, res) {
    if (!req.body.library_id) {
      try {
        const id = token.getId((req.cookies||{}).token);
        if (id) {
          req.body.library_id = (req.body.uid || id) + '-fav'
        }
      } catch (e) {
        console.error(e)
      }
    }
    if (req.body.id) {
      const { query } = await connection
      const book = await query(`SELECT book_id FROM bookshelf.books WHERE book_id='${req.body.id}';`)
      if (book.length) {
        return res.send({
          book_id: req.body.id,
          exist: true
        })
      }
    }
    const bookId = req.body.id || uuid.v4()
    callProcedure('createBook', [bookId, req.body.library_id, replaceQuotes(req.body.title, changingReplacer), replaceQuotes(req.body.author, changingReplacer), replaceQuotes(req.body.description, changingReplacer), req.body.img])
      .then(() => res.send({ bookId }))
      .catch(e => errorHandler(res, e))
  },
  async get (req, res) {
    if (!req.body.library_id) {
      try {
        const id = token.getId((req.cookies||{}).token);
        if (id) {
          req.body.library_id = (req.body.uid || id) + '-fav'
        }
      } catch (e) {
        console.error(e)
      }
    }
    const { query } = await connection
    query(`
    SELECT DISTINCT
    ${dbSelection.book}
    FROM books as b INNER JOIN library_book as lb
    ON lb.book_id=b.book_id
    WHERE lb.library_id='${req.body.library_id}';          
    `)
      .then((data) => {
        data = data.map(book => {
          book.favorite = true
          return book
        })
        return res.send({ success: true, data })
      })
      .catch(e => errorHandler(res, e))
  },
  async getBook (req, res) {
    if (!req.body.book_id) {
      errorHandler(res, 'Bed request!')
    }
    const { query } = await connection
    query(`SELECT ${dbSelection.book} FROM books as b WHERE b.book_id='${req.body.book_id}';`)
      .then(book => {
        return res.send({ success: true, book })
      })
      .catch(e => errorHandler(res, e))
  },
  async remove (req, res) {
    if (!req.body.library_id) {
      try {
        const id = token.getId((req.cookies||{}).token);
        if (id) {
          req.body.library_id = (req.body.uid || id) + '-fav'
        }
      } catch (e) {
        console.error(e)
      }
    }
    if (!req.body.library_id || !req.body.id) {
      return errorHandler(res, 'Bad request!')
    }
    const { query } = await connection
    const relation = await query(`SELECT library_book_id FROM bookshelf.library_book WHERE book_id='${req.body.id}' AND library_id='${req.body.library_id}';`)
    if (!relation.length) {
      errorHandler(res, 'This relation does not exist.')
    }
    const book = await query(`SELECT book_id FROM bookshelf.books WHERE book_id='${req.body.id}';`)
    if (!book.length) {
      errorHandler(res, 'This book does not exist.')
    }
    query(`DELETE FROM bookshelf.library_book WHERE book_id='${req.body.id}' AND library_id='${req.body.library_id}';`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  },
  async add (req, res) {
    if (!req.body.library_id) {
      try {
        const id = token.getId((req.cookies||{}).token);
        if (id) {
          req.body.library_id = (req.body.uid || id) + '-fav'
        }
      } catch (e) {
        console.error(e)
      }
    }
    if (!req.body.library_id || !req.body.id) {
      return errorHandler(res, 'Bad request!')
    }
    const { query } = await connection
    const relation = await query(`SELECT library_book_id FROM bookshelf.library_book WHERE book_id='${req.body.id}' AND library_id='${req.body.library_id}';`)
    if (relation.length) {
      errorHandler(res, 'This relation exist.')
    }
    const book = await query(`SELECT book_id FROM bookshelf.books WHERE book_id='${req.body.id}';`)
    if (!book.length) {
      errorHandler(res, 'Create book before adding to library.')
    }
    query(`INSERT INTO bookshelf.library_book (book_id, library_id) VALUES ('${req.body.id}', '${req.body.library_id}');`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  },
  async charts (req, res) {
    let data = null
    if (!req.body.library_id) {
      try {
        const id = token.getId((req.cookies||{}).token);
        if (id) {
          req.body.library_id = (req.body.uid || id) + '-fav'
        }
      } catch (e) {
        console.error(e)
      }
    }
    try {
      data = (await chartsModel.getBestSellersByCategory(req.query.category)).data
      const { query } = await connection
      let relation = []
      try {
        relation = (await query(`SELECT book_id FROM bookshelf.library_book WHERE library_id='${req.body.library_id}';`)).map(item => item.book_id)
      } catch (e) {
        console.log(e);
      }
      data.results.books = data.results.books.map(book => {
        const id = generateBookId(book)
        return {
          author: book.author,
          img: book.book_image && book.book_image !== '' ? book.book_image : 'empty',
          title: book.title,
          description: book.description,
          rank: book.rank,
          favorite: relation.includes(id),
          category: req.query.category,
          id
        }
      })
    } catch (e) {
      return errorHandler(res, e, (e.response||{}).status)
    }
    return res.send(data);
  }
}

module.exports = book

function generateBookId (book) {
  return (replaceQuotes(book.title||'', /[ '"`]/g) + replaceQuotes(book.author||'', /[ '"`]/g)).toLowerCase()
}

function replaceQuotes(text, replacer = '') {
  return text.replace(/['"`]/g, replacer)
}

function changingReplacer (text) {
  return '\\' + text
}
