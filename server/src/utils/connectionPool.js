const mysql = require('mysql')
const dbConfig = require('../config/db.json')
const util = require('util');

const pool = mysql.createPool(dbConfig);

module.exports.pool = pool
module.exports.connection = new Promise((res, rej) => {
  pool.getConnection((e, connection) => {
    if (e) {
      rej(e)
      return
    }
    connection.query = util.promisify(connection.query).bind(connection);
    res(connection)
  });
})
