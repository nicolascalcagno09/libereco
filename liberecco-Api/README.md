# Warehouse Management System

## Installation

`sudo npm install -g yarn`
`sudo yarn global add typescript`
`sudo npm install -g tsc`
`sudo npm install -g tsc-node`

These four previous ones will be the main tools that we will use for the necessary commands.

### Requirements
	* MySQL >= 5.7 || MariaDB >=10.3.13
	* nodejs >= 10
	* npm

### Create database and user to user to use in the application
```
	mysql> CREATE USER [DB_USER] IDENFIED BY '[MyPassword]';
	mysql> CREATE DATABASE [MyDatabase];
	mysql> GRANT ALL PRIVILEGES ON [MyDatabase].* TO [DB_USER];
```

### Command order to install and start for the first time

```
	sudo npm install -g yarn
	sudo yarn global add typescript
	sudo npm install -g tsc
	sudo npm install -g tsc-node
	npm install typescript @types/node
	cd mga-krack/mga-api
	cp .env.example .env
	vi .env # Abrir .env y colocar las credenciales de la base de datos
```

```
yarn add express
yarn add @types/express
yarn install
yarn run db:seed
yarn run dev
Collection = utf8mb4_general_ci
```

### For the correct support of typescript

`npm install typescript @types/node`

### Add dependencies in a particular package

- Go to the corresponding directory example: `cd krack / mga-api`
- Execute the command: `yarn add express`
- Check if types for typescript exist: `yarn add @ types / express`

With this the dependency must already be correctly installed.



### Available Commands

* `yarn run start`: Execute the index.ts of the project in which we are standing. (Example: about `krack / mga-api`)
* `yarn run build`: This command is executed to create the corresponding compilation of the app.
* `yarn run test: coverage` Run tests with code coverage report.

>Instead of running the TypeScript compiler every time you make a change, you can start the compiler in watch mode instead so that it recompiles every time there are changes to the TypeScript files.

For this in particular we make use of the dependency `nodemon` highly known in the nodejs community.

To leave in watch the files instead of walking compiling for each change use:
`yarn run dev` (With this command it will correctly leave us in watch mode the API being able to raise the server)

### Migrations
<aside class="notice">
	The coding of the database must be `utf8mb4_general_ci`
</aside>

To create the migration of all tables use the command
`yarn run migration: global`

To create new migrations use the command:
`yarn run migration-create name_of_migration`

To execute the existing migrations use the command:
`yarn run migration-run`

To go back the migrations executed by batchs (that is to say by running sequence of the run) use:
`yarn run migration-revert`

To create Test DB use the command:

`yarn migration-test:create`

To delete Test DB use the command:

`yarn migration-test:delete`

### Seeders
Execute the command:

`yarn run db: seed`

To Seeders Test execute the command:

`yarn run db:seedTest`

By showing us the Seeders executed message, we can now cut the process.
Check the BD if everything is correctly loaded.

### TS Lint
We will use this to respect standards defined at the code style level (we rely on the Airbnb model)
> TSLint is an extensible static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors.

To check if we are complying with ts-lint compliance execute:
`yarn run lint`

If you want automatic fixes (IMPORTANT, CHECK THAT DO NOT MAKE CHANGES THAT AFFECT THE CODE)
`yarn run lint-fix`

It is more advisable to see the errors with the lint and to make the fixes by hand, since otherwise you can change many things of the code without one being well aware that it may have broken by changing some variable name.

### Unit tests

The project uses Moche & Chai for unit tests

`yarn test`

For a complete entity test

`yarn test --dir roles`

For a more specific test use:

`yarn test --specs users roles inventory`

For an entity test with a specific file

`yarn test --dir inventory --specs inventory pagination`

For an entity test with a specific request

`yarn test --dir inventory --specs inventory --request show.inventory.json`

To check if each endpoint contains the test

`yarn test --check`

Alternatively, the "build" objective of the "test" task compiles the application before running the tests.

`yarn test: build`

### Test Driven Development

Using 'nodemon', 'mocha' runs to run all the tests as soon as there is a change in the src / or test / files

`yarn dev:test`


### Login
Data to access (All endpoints are in postman)

Api Team Collection -> Oauth2 -> Login

Headers
Authorization = Basic base64 (krack-sga: secret)

Body
grant_type: password
username: admin@krackonline.com
password: ChangeMe.1234



# Contribute

## API Doc
To generate the API documentation:

`yarn doc`


## CRUD Generator
To standardize the development of entities and layers, a generator for CRUD has been developed

`yarn run yo expressjs-rest:crud Test`

It will generate the following files:
```
   create src/API/Application/Domain/Entities/Test.ts
   create src/API/Routes/Tests/tests.routes.ts
   create src/API/Controllers/TestController.ts
   create src/API/Controllers/Schemas/TestSchema.ts
   create src/API/Application/Services/Tests/TestServices.ts
   create src/API/Application/Commands/Tests/CreateTestCommand.ts
   create src/API/Application/Handlers/Tests/CreateTestHandler.ts
   create src/API/Application/Commands/Tests/GetAllTestsCommand.ts
   create src/API/Application/Handlers/Tests/GetAllTestsHandler.ts
   create src/API/Application/Commands/Tests/GetSingleTestCommand.ts
   create src/API/Application/Handlers/Tests/GetSingleTestHandler.ts
   create src/API/Application/Commands/Tests/UpdateTestCommand.ts
   create src/API/Application/Handlers/Tests/UpdateTestHandler.ts
   create src/API/Application/Commands/Tests/DeleteTestCommand.ts
   create src/API/Application/Handlers/Tests/DeleteTestHandler.ts
```

For correct operation it is necessary to register the command mentors in the COmmand Bus:

`API / Application / Commands / CommandBus.ts`

and the routes in the express router.
