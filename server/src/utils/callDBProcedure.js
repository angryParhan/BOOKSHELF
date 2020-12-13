const { connection } = require('../utils/connectionPool')

function call (name, params) {
  return new Promise( (resolve, reject) => {
      connection.then(connection => {
        let sql = params.reduce((acc, item) => {
          acc = acc ? acc + ', ' : acc
          if (!item && typeof item !== 'boolean') {
            return acc + 'NULL'
          }
          return acc + `'${item}'`
        }, '')
        connection.query(`CALL ${name}(${sql})`).then(resolve).catch(reject)
      }).catch(reject)
  })
}

module.exports = call
