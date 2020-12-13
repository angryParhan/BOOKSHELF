const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql')
const passport = require('passport')
const authRoutes = require('./routes/auth')
const libraryRoutes = require('./routes/library')
const bookRoutes = require('./routes/book')
const dbConfig = require('./config/db.json')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(passport.initialize())
app.use(cors({
  origin: [
    'http://localhost:8080',
    'https://localhost:8080'
  ],
  credentials: true,
  exposedHeaders: ['set-cookie']
}));
app.use('/api/auth', authRoutes)
app.use('/api/library', libraryRoutes)
app.use('/api/book', bookRoutes)

require('./middleware/passport')(passport)

const connection = mysql.createConnection(dbConfig)

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected')
  }
})

app.listen(process.env.PORT || 8090)
