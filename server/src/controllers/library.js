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
    callProcedure('createLibrary', [
          library_id,
          req.body.uid,
          replaceQuotes(req.body.name, changingReplacer),
          replaceQuotes(req.body.description, changingReplacer),
          req.body.visible,
          req.body.artwork,
          replaceQuotes(req.body.external_info, changingReplacer, /[']/g)
    ])
      .then(async () => {
        const { query } = await connection
        const library = (await query(`SELECT ${dbSelection.library} FROM libraries as l WHERE library_id='${library_id}'`))[0]
        res.send({
          success: true,
          library
        })
      })
      .catch(e => errorHandler(res, e))
  },
  async delete (req, res) {
    if (!req.body.library_id) {
      return errorHandler(res, 'Bad request!')
    }
    const { query } = await connection
    try {
      await query(`DELETE bookshelf.libraries WHERE library_id='${req.body.library_id}';`)
      await query(`DELETE bookshelf.user_library WHERE library_id='${req.body.library_id}';`)
    } catch (e) {
      errorHandler(res, e)
    }
  },
  async remove (req, res) {
    if (!req.body.library_id || !req.body.uid) {
      try {
        const id = token.getId((req.cookies||{}).token);
        if (id) {
          req.body.uid = id
          req.body.library_id = req.body.library_id || (id + favSuffix)
        } else {
          return errorHandler(res, 'Bad request!')
        }
      } catch (e) {
        return errorHandler(res, 'Bad request!')
      }
    }
    try {
      const { query } = await connection
      const relation = await query(`SELECT user_library_id FROM bookshelf.user_library WHERE user_id='${req.body.uid}' AND library_id='${req.body.library_id}';`)
      if (!relation.length) {
        errorHandler(res, 'This relation does not exist.')
      }
      const library = await query(`SELECT library_id FROM bookshelf.libraries WHERE library_id='${req.body.library_id}';`)
      if (!library.length) {
        errorHandler(res, 'This book does not exist.')
      }
      await query(`DELETE FROM bookshelf.user_library WHERE user_id='${req.body.uid}' AND library_id='${req.body.library_id}';`)
      return res.send({ success: true })
    } catch (e) {
      return errorHandler(res, e)
    }
  },
  edit (req, res) {
    if (!req.body.id) {
      return errorHandler(res, 'Bad request!')
    }
    updateQuery({
      library_name: req.body.title,
      library_description: req.body.description,
      library_artwork: req.body.img,
    }, `library_id='${req.body.id}'`, 'libraries')
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
          library.favorite = library.id === req.body.uid + favSuffix
          library.my = library.uid === req.body.uid
          return library
        })
        return res.send({ success: true, data })
      })
      .catch(e => errorHandler(res, e))
  },
  async get (req, res) {
    if (!req.query.uid) {
      try {
        const id = token.getId((req.cookies||{}).token);
        if (id) {
          req.query.uid = id
        }
      } catch (e) {
        console.error(e)
      }
    }
    if (!req.query.library_id) {
      req.query.library_id = req.query.uid + favSuffix
    }
    try {
      const { query } = await connection
      let relation = []
      if (req.query.uid) {
        try {
          relation = (await query(`SELECT book_id FROM bookshelf.library_book WHERE library_id='${req.query.uid + favSuffix}';`)).map(item => item.book_id)
        } catch (e) {
          console.log(e);
        }
      }
      const library = (await query(`
        SELECT 
        ${dbSelection.library}
        FROM libraries as l
        WHERE l.library_id = '${req.query.library_id}';
      `))[0]
      library.books = await query(`
        SELECT DISTINCT
        ${dbSelection.book}
        FROM books as b INNER JOIN library_book as lb
        ON lb.book_id=b.book_id
        WHERE lb.library_id='${req.query.library_id}';  
      `)
      library.books.forEach(book => {
        book.favorite = relation.includes(book.id)
      })
      if (library.id === req.query.uid + favSuffix) {
        library.favorite = true
      }
      library.my = true
      return res.send({ success: true, library })
    } catch (e) {
      return errorHandler(res, e)
    }
  },
}

module.exports = library

function replaceQuotes(text = '', replacer = '', regEx = /['"`]/g) {
  return text.replace(regEx, replacer)
}


function changingReplacer (text) {
  return '\\' + text
}
