const JwtStrategy = require('passport-jwt').Strategy
const keys = require('../config/keys');
const { connection } = require('../utils/connectionPool')
const opts = {};

opts.jwtFromRequest = req => (((req||{}).cookies||{}).token || '').replace('Bearer ', '')
opts.secretOrKey = keys.jwt;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async (payload, done) => {
    const query = (await connection).query
    query(`SELECT user_email, user_id FROM bookshelf.users WHERE user_id='${payload.uid}'`)
      .then(rows => {
        if (rows.length) {
          return done(null, rows[0]);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
      .catch(error => done(error, false))
  }));
}
