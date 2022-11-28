# Build A Storefront Backend => Udacity

This is a backend API build in Nodejs use express framework for an online store. It produce a RESTful API that will be used by the frontend team.

## Technologies

- Postgres ===> for the database
- Node/Express ====> for the application logic
- dotenv ====> from npm for managing environment variables
- db-migrate ====> from npm for migrations
- jsonwebtoken =====> from npm for working with JWTs
- jasmine =====> from npm for testing
- helmet =====> from add some security to app
- morgan =====> as alogger to our app
- bcrypt =====> to hash password in our app
- jasmine =====> from npm for testing
- supertest ====> use in test api endpoints

## Installation

```
npm install
```

## Packages

### Dependencies

```sh
    "bcrypt": "^5.1.0",
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "helmet": "^6.0.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "pg": "^8.8.0",
    "supertest": "^6.3.1"
```

### Dev Dependencies

```sh
    "@types/bcrypt": "^5.0.0",
    "@types/cors": "^2.8.12",
    "@types/express": "^4.17.14",
    "@types/helmet": "^4.0.0",
    "@types/jasmine": "^3.10.6",
    "@types/jsonwebtoken": "^8.5.9",
    "@types/morgan": "^1.9.3",
    "@types/node": "^18.11.9",
    "@types/pg": "^7.14.11",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.44.0",
    "@typescript-eslint/parser": "^5.44.0",
    "eslint": "^8.28.0",
    "eslint-config-plugin": "^1.0.11",
    "eslint-config-prettier": "^8.5.0",
    "jasmine": "^3.99.0",
    "jasmine-spec-reporter": "^7.0.0",
    "nodemon": "^2.0.20",
    "prettier": "^2.8.0",
    "ts-node": "^10.9.1",
    "tsc-watch": "^4.6.2",
    "typescript": "^4.9.3"
```

## Package Install Global

- typescript
- jasmine
- db-migrate

```sh
npm i typescript jasmine db-migrate -g
```

## Scripts

- ### Watch

```sh
npm run watch => using tsc-watch
```

- ### Build

```sh
npm run build
```

- ### Migrate up => dev db

```sh
npm run db:migrate:up
```

- ### Migrate reset ==> dev db

```sh
npm run db:migrate:reset
```

- ### Migrate up => test db

```sh
npm run test:migrate:up
```

- ### Migrate reset ==> test db

```sh
npm run test:migrate:reset
```

- ### Test

```sh
npm run test
```

- ### Linter

```sh
npm run lint
npm run format # for fix
```

### Database Creation

```sh
# create user
CREATE USER dbuser WITH PASSWORD 'sercretPass';

# create Database for dev and test
CREATE DATABASE store_dev; CREATE DATABASE store_test;

# grant all databases to the user
GRANT ALL PRIVILEGES ON DATABASE store_dev TO dbuser; GRANT ALL PRIVILEGES ON DATABASE store_dev TO dbuser;
```

### Database Migrations

```sh
# connect to db from terminal
psql -h 127.0.0.1 -U postgress
# insert root password that you create when install pg
\l #to show db in schema
# run this command to create all tables
db-migrate up
#  run this command to drop each table separately
db-migrate down
# to reset the data schema tables run this command
db-migrate reset
```

### Ports used

```sh
PORT=3000
DB_PORT=5432

```

After start up, the server will start on port `3000` and the database on port `5432`

### Environmental Variables (.env)

```sh
# to connect with the database use the following environmental variables
 # .env variables
NODE_ENV=dev
PORT=3000
# db information
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=store_dev
DB_DATABASE_TEST=store_test
DB_USER=dbuser
DB_PASS=sercretPass
# encryption
BCRYPT_PASSWORD=welcome_to_udacity_nanodegree
SALT_ROUNDS=10
TOKEN_SECRET=egyfwd_4_ever
TOKEN_EXPIRES=600

```

The database schema and and API route information can be found in the [REQUIREMENT.md](REQUIREMENTS.md)
