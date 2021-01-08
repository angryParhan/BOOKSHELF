# library-app

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Server setup
```
cd server
npm install
```
### Init database

1. Install MySQL Server and MySQLWorkbench
2. Set up your server and replace password on yours in /server/sql/PRIVILEGES.sql and /server/src/config/db.json files
2. Run SQL Scripts from /server/sql folder
CREATE.sql -> PROSEDURES.sql -> PRIVILEGES.sql

### Run a server

```
cd server
npm start
```

