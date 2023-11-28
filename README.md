# crud-to-do-app


# To do application CRUD using React Typescipt, NodeJs, SQLite, Express, JWT

### You Can use this as a starter kit.


# Todo List

## Table of Contents
- [Frontend](#Frontend)

- [Backend](#Backend)


## Frontend
``sh
cd app
``

### install packages
``sh
npm i
``

### start
``sh
npm run dev
``

## Backend
``sh
cd backend
``

### install packages
``sh
npm i
``

### only do this if db is not there under src/db/
``sh
ts-node ./src/db/init_db.ts
``
### start
``sh
npm start
``

## test user
email:test
password:test

## env file variables in backend (.env)
``
SALT=test
SECRET_KEY=test
TOKEN_LIFESPAN=test
``


## Acknowledgements

 - [Vite](https://vitejs.dev/guide)
 - [Typescript](https://www.typescriptlang.org)
 - [sqlite3](https://www.npmjs.com/package/sqlite3)
 - [React](https://react.dev/)
 - [Mui](https://mui.com/)
 - [Bootstrap](https://react-bootstrap.netlify.app/)
 - [JWT](https://github.com/auth0/node-jsonwebtoken)
 - [Redux](https://redux-toolkit.js.org/introduction/getting-started)


