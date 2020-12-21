const uuid = require('uuid')
const { connection } = require('../utils/connectionPool')
const dbSelection = require('../config/dbSelection.json')
const errorHandler  = require('../utils/errorHandler')
const callProcedure  = require('../utils/callDBProcedure')
const updateQuery  = require('../utils/updateQuery')
const token  = require('../utils/token')
const favSuffix = '-fav'

const library = {
  create (req, res) {
    if (!req.body.uid) {
      try {
        const id = token.getId((req.cookies||{}).token);
        if (id) {
          req.body.uid = id
        }
      } catch (e) {
        console.error(e)
      }
    }
    const library_id = uuid.v4()
    callProcedure('createLibrary', [library_id, req.body.uid, req.body.name, req.body.description, req.body.visible, req.body.artwork])
      .then(async () => {
        const { query } = await connection
        const library = (await query(`SELECT ${dbSelection.library} FROM libraries as l WHERE library_id='${library_id}'`))[0]
        res.send({
          success: true,
          library
        })
      })
      .catch(e => errorHandler(res, e))
    return
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
  async getAll (req, res) {
    if (!req.body.uid) {
      try {
        const id = token.getId((req.cookies||{}).token);
        if (id) {
          req.body.uid = id
        }
      } catch (e) {
        console.error(e)
      }
    }
    const { query } = await connection
    query(`
    SELECT DISTINCT
    ${dbSelection.library}
    FROM users as u, libraries as l, user_library as ul 
    WHERE ul.user_id = '${req.body.uid}'
          AND ul.library_id = l.library_id;
    `)
      .then(data => {
        data = data.map(library => {
          if (library.library_id === req.body.uid + favSuffix) {
            library.favorite = true
          }
          library.my = true
          return library
        })
        return res.send({ success: true, data })
      })
      .catch(e => errorHandler(res, e))
  },
  async get (req, res) {
    if (!req.body.library_id) {
      if (!req.body.uid) {
        try {
          const id = token.getId((req.cookies||{}).token);
          if (id) {
            req.body.uid = id
          }
        } catch (e) {
          console.error(e)
        }
      }
      req.body.library_id = req.body.uid + favSuffix
    }
    const { query } = await connection
    query(`
    SELECT 
    ${dbSelection.library}
    FROM libraries as l
    WHERE l.library_id = '${req.body.library_id}';
        `)
      .then(async library => {
        const books = await query(`
            SELECT DISTINCT
            ${dbSelection.book}
            FROM books as b INNER JOIN library_book as lb
            ON lb.book_id=b.book_id
            WHERE lb.library_id='${req.body.library_id}';  
            `)
        library = library[0]
        library.books = books
        if (library.id === req.body.uid + favSuffix) {
          library.favorite = true
        }
        library.my = true
        return res.send({ success: true, library })
      })
      .catch(e => errorHandler(res, e))
  },
}

module.exports = library
