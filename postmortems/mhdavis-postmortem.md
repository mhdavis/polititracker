# Postmortem
### By [Michael Davis](https://github.com/mhdavis)

## Introduction

This postmortem serves as an opportunity to reflect on the new techniques and technologies I used in contributing to this application.

## Technologies
- **Frontend** - [Handlebars.js](http://handlebarsjs.com/ "Handlebars Docs") / [JQuery](https://jquery.com/ "JQuery Docs")
- **API Handling** - [Axios](https://www.npmjs.com/package/axios "Axios Docs") / [JQuery](https://jquery.com/ "JQuery Docs")
- **Routing** - [Express.js](https://expressjs.com/ "Express Docs")
- **Backend / Server** - [Node.js](https://nodejs.org/en/ "Node Docs")
- **Database** - [MySQL](https://www.mysql.com/, "MySQL Docs") / [Sequelize ORM](http://docs.sequelizejs.com/, "Sequelize Docs")
- **User Authentication** - [Passport.js](http://passportjs.org/ "Passport Docs")

## Learning Objectives

### Table of Contents
- [Basic Development Concepts](#lo-basic-dev-concepts)
- [Javascript Concepts](#lo-js-concepts)
- [Handlebars.js](#lo-handlebars)
- [JQuery](#lo-jquery)
- [Axios](#lo-axios)
- [Sequelize](#lo-sequelize)
- [Passport.js](#lo-passport)
- [Heroku & Deployment](#lo-heroku-and-deployment)


##### Basic Development Concepts <a name="lo-basic-dev-concepts"></a>
- Learned about environment variables and storing API keys
- Learned to wrap external API results with own API wrapper for easier query access
- Learned how to construct basic server
- Built an application using the Model View Controller (MVC) design paradigm

##### Javascript Concepts <a name="lo-js-concepts"></a>
- Learned to implement `Promises` in order to force synchronous data acquisition from API
- Used recursion to run script on array of dynamic length. (querying API elections)


##### Handlebars.js <a name="lo-handlebars"></a>
- Learned about passing information to frontend handlebars via `res.render()`
- Learned to alter views folder structure using `express-handlebars` NPM package
- Learned how to access static HTML/CSS/JS scripts in the `/public` directory
- Learned about the difference between initial rendering of the DOM (handlebars) versus rendering post-API call (jQuery)

##### JQuery <a name="lo-jquery"></a>
- (Frontend) - Learned how to write JQuery to dynamically render information based on data received via API call

#### Axios <a name="lo-axios"></a>
- Learned how to query API through backend of application

#### Sequelize <a name="lo-sequelize"></a>
- Used all known CRUD operations (create, read, update, delete) on users and user information.
- Used `sequelize-cli` to initialize `/models` and `/config` files

##### Passport.js <a name="lo-passport"></a>
- Learned to properly separate controllers associated with user CRUD actions
and user session
- Learned about using local strategies to decrypt and verify user identities /
find user information in database
- Learned about passing user information to different routes
-  Learned about basic encryption using `bcrypt` NPM package

##### Heroku & Deployment <a name="lo-heroku-and-deployment"></a>
- Learned to alter `index.js` to be compatible for Heroku deployment with JAWS DB
- Learned the general process for deploying an app that uses SQL / Sequelize database
