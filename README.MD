# CodeMinds (Stackoverflow Clone)

# Description

This project is supposed to be backend clone of the poular website stackoverflow meant for study purposes.
in a 1.0 release, users should be able to ask questions, answer questions, comment and also be able to upvote or downvote. They will also have a "reputation" exactly like stackoverflow.  

I'd also like to add new features after the "core" is complete, such as community awards, admin tools for users with high reputation, better perfomance and more reliability and scalability.

## Objective

The main objective of this project is mainly to study more deeply about automated tests, databases, scalability and writing an easily maintanable software product.

---

# Tech Stack
 - NodeJS
 - Typescript
 - Docker
 - Fastify
 - Prisma
 - PostgreSQL
 - Vitest

---
## Installation

Create a .env file in the root of your project, following .env.example as a guide.

Install the necessary dependencies:

```bash
$ npm i 
```

Start the database:
```bash
$ docker compose up
```

Initialize prisma:

```bash
$ npx prisma init
```

Don't forget to update the username, password and database name in **DATABASE_URL** variable in **.env**

Run the migrations: 

```bash
$ npx prisma migrate dev 
```

## Running the app

```bash
# development
$ npm run start:dev
```
```bash
# build
$ npm run build
```
```bash
# production mode
$ npm run start
```

