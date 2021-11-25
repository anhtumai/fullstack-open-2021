# Phonebook

> Backend for phonebook project for course fullstack open 2021.
> Written in Express (Typescript)

[Heroku link](https://phonebook-backend-87.herokuapp.com/info)

## Persons

`/api/persons` - **GET**

* View all records table (username and number)

`/api/persons/<string:person_id>` - **GET**

* View single person record by ID

`/api/persons` - **POST**

* Add new phonenumber record
* Params: `name`, `number`

`/api/persons/<string:person_id>` - **DELETE**

* Delete phonenumber record by ID

`/api/persons/<string:person_id>` - **PUT**

* Update phonenumber record by ID
* Params: `name`, `number`
