## Description

The server, hourly, connects to the API (refer to the below url) which shows recently posted articles about Node.js on Hacker News. It inserts the data from the API into a database and also define a REST API which the client (e.g. Postman) will be used to retrieve the data.

Hacker News URL: https://hn.algolia.com/api/v1/search_by_date?query=nodejs

The service returns paginated results with a maximum of 5 items and is able to be filtered by author, tags, title. Also, this permits the user to remove items and these ones not reappear when the app is restarted.

## Requirements

- Node
- Postgres

## Database Model

Search for db_dump.sql file in project's root folder and run:
```bash
$ pg_restore db_dump.sql
```
Also you can restore DB with pgAdmin by using ```Menu > Tools > Restore``` option selecting the dump file.

## Database Configuration

Create a ```.env``` file in your root folder project, then copy the configuration variables in ```.env.sample``` file.

## Project Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## API Documentation

http://localhost:3000/documentation

## Stay in touch

- Author - [Jose Zerpa](https://vincentdev.xyz)
- Twitter - [@zerpajose](https://twitter.com/zerpajose)
