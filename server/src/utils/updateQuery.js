const { connection } = require('./connectionPool')

module.exports = function (params, condition, table) {
  return new Promise((resolve, reject) => {
    const query = Object.keys(params).reduce((acc, item) => {
      return (acc ? acc + ', ' : acc) + `${item} = '${params[item]}'`
    }, '')
    connection
      .then(connection => connection.query(`UPDATE ${table} SET ${query} ${condition ? 'WHERE ' + condition : ''};`))
      .then(resolve)
      .catch(reject)
  })
}
