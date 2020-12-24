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
          library,
          uid: req.body.uid,
          id: library_id
        })
      })
      .catch(e => errorHandler(res, e))
  },
  async add (req, res) {
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
    if (!req.body.uid || !req.body.id) {
      return errorHandler(res, 'Bad request!')
    }
    const relation = await query(`SELECT user_library_id FROM bookshelf.user_library WHERE user_id='${req.body.uid}' AND library_id='${req.body.id}';`)
    if (relation.length) {
      errorHandler(res, 'This relation exist.')
    }
    const library = await query(`SELECT library_id FROM bookshelf.libraries WHERE library_id='${req.body.id}';`)
    if (!library.length) {
      errorHandler(res, 'Create library before adding.')
    }
    query(`INSERT INTO bookshelf.user_library (user_id, library_id) VALUES ('${req.body.uid}', '${req.body.id}');`)
      .then(() => res.send({ success: true }))
      .catch(e => errorHandler(res, e))
  },
  async delete (req, res) {
    if (!req.body.id) {
      return errorHandler(res, 'Bad request!')
    }
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
    try {
      await query(`DELETE FROM bookshelf.user_library WHERE library_id='${req.body.id}';`)
      console.log('deleted')
      const relation = await query(`SELECT * FROM bookshelf.libraries WHERE library_creator_id='${req.body.uid}' AND library_id='${req.body.id}';`)
      if (relation.length) {
        await query(`DELETE FROM bookshelf.libraries WHERE library_id='${req.body.id}';`)
        return res.send({
          success: true,
          deleted: true,
          removed: true
        })
      }
      return res.send({
        success: true,
        removed: true
      })
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
    const { query } = await connection

    query(`
    SELECT DISTINCT
    ${dbSelection.library}
    FROM users as u, libraries as l, user_library as ul 
    WHERE ul.user_id = '${req.query.uid}'
          AND ul.library_id = l.library_id;
    `)
      .then(data => {
        data = data.map(library => {
          library.favorite = library.id === req.query.uid + favSuffix
          library.my = true
          library.creator = library.uid === req.query.uid
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
    if (!req.query.id) {
      req.query.id = req.query.uid + favSuffix
    }
    try {
      const { query } = await connection
      let relationLibraryBook = []
      let relationUserLibrary = []
      if (req.query.uid) {
        try {
          relationLibraryBook = (await query(`SELECT book_id FROM bookshelf.library_book WHERE library_id='${req.query.uid + favSuffix}';`)).map(item => item.book_id)
          relationUserLibrary = (await query(`SELECT user_id FROM bookshelf.user_library WHERE user_id='${req.query.uid}' AND library_id='${req.query.id}';`)).map(item => item.user_id)
        } catch (e) {
          console.log(e);
        }
      }
      const library = (await query(`
        SELECT 
        ${dbSelection.library}
        FROM libraries as l
        WHERE l.library_id = '${req.query.id}';
      `))[0]
      library.books = await query(`
        SELECT DISTINCT
        ${dbSelection.book}
        FROM books as b INNER JOIN library_book as lb
        ON lb.book_id=b.book_id
        WHERE lb.library_id='${req.query.id}';  
      `)
      library.books.forEach(book => {
        book.favorite = relationLibraryBook.includes(book.id)
      })
      if (library.id === req.query.uid + favSuffix) {
        library.favorite = true
      }
      library.my = relationUserLibrary.includes(req.query.uid)
      library.creator = library.uid === req.query.uid
      return res.send({ success: true, library })
    } catch (e) {
      return errorHandler(res, e)
    }
  },
  async latest (req, res) {
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
    try {
      const { query } = await connection

      const libraries = await query(`SELECT ${dbSelection.library} FROM libraries as l ORDER BY l.cdate DESC LIMIT ${req.query.count || 4}`)
      const relationUserLibrary = (await query(`SELECT library_id FROM bookshelf.user_library WHERE user_id='${req.query.uid}';`)).map(item => item.library_id)

      for (let i = 0; i < libraries.length; i++) {
        let library = libraries[i]
        library.user = (await query(`SELECT ${dbSelection.user} FROM users as u WHERE u.user_id='${library.uid}'`))[0]
        library.creator = library.uid === req.query.uid
        library.my = relationUserLibrary.includes(library.id)
        library.favorite = library.id === req.query.uid + favSuffix
      }

      return res.send({
        success: true,
        libraries
      })

    } catch (e) {
      errorHandler(res, e)
    }
  }
}

module.exports = library

function replaceQuotes(text = '', replacer = '', regEx = /['"`]/g) {
  return text.replace(regEx, replacer)
}


function changingReplacer (text) {
  return '\\' + text
}
