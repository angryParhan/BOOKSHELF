const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const { pool } = require('../utils/connectionPool')
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwt;

module.exports = passport => {
  // console.log(' use', passport.use);
  passport.use(new JwtStrategy(opts, (payload, done) => {
    pool.getConnection((e, connection) => {
      if (e) {
        return done(e, false);
      }
      connection.query(`SELECT user_email, user_id FROM bookshelf.users WHERE user_id = '${payload.user_id}'`, (error, rows) => {
        if (error) {
          return done(error, false);
        }
        if (rows[0]) {
          return done(null, rows[0]);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
    });
  }));
}
