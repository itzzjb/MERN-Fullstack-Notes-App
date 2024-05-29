# Backend

Refer to [npmjs](https://www.npmjs.com) Website for learn about any package.

## Initializing the node server

`-y` : Configurations for the metadata that we need to do while `npm init` is done automatically using default values. These values are only important if you want to release a package or a library.

`npm`: Node Package Manager (build tool like maven and gradle)

```sh
npm init -y
```

This creates the `package.json` file. This has all the configurations for our project. We also list the dependencies here.

> [!NOTE]
> Dependencies are packages we use in our projects. (TypeScript, Bootstrap)

## Installing TypeScript

**TypeScript**: This is superset of JavaScript that you will be able to declare the type of variables. Similar to Java, Kotlin and Swift.

`--save-dev`: Installs the package as a devDependency.

```sh
npm install --save-dev typescript
```

This will add typescript under the devDependencies section of the `package.json` file

> [!NOTE]
> There are two types of dependencies. (Normal and Dev)
> **Dev Dependencies**: These dependencies are dependencies that we don't actually need in production. We only need them while we are writing the code. We later save space when we deploy this application for production because these dependencies will be skipped.

This also creates a node_modules directory and a `package-lock.json` file. The node_modules directory contains the packages that we installed.

## TypeScript Configuration File

Every typescript project requires a typescript configuration file. This contains the information on how typescript should behave.

`-tsc`: Typescript Compiler

```sh
npx tsc --init
```

`npx`: Node Package Execute (executes installed packages)

This creates a `tsconfig.json` file.

## Installing Express

**Express** : Express is the framework that allows us to make the server. This allows us to write server code, end points etc.

**Node** : Node is just the foundation that the code runs on.

`npm i` is the short term for `npm install`

```sh
npm i express
```

We don't use `--save-dev` because Express is a normal dependency that is need in development and production both.

This will add express under the dependencies section of the `package.json` file

## Installing Types for Express

Because we are writing the code in typescript we need to install the package that consists the types, so that our code works properly and typescript understand the types.

`--save-dev`: Installs the package as a devDependency.

```sh
npm i --save-dev @types/express
```

This will add typescript under the devDependencies section of the `package.json` file

> [!TIP]
> If you want to install a specific version of a dependency we can use a command like `npm install express@4.18.2`

## Starting a Express server written in Typescript

Normally, if we are using a javascript file we just need to use a command like following.

```sh
node index.js
```

But here we are using typescript. The above command only work for javascript files.

> [!WARNING]
> We need to compile the typescript file into a javascript

```sh
npx tsc
```

This will compile the `server.ts` file and create a new `server.js`. Now, we can start the server using javascript file.

```sh
node server.js
```

## Organizing the code

1. Adding all the source code into a `src` directory. Every configuration files stays outside of the `src` directory.
2. We need to tell typescript compiler to add the generated javascript files into its own folder. (dist : distribution)
   - Uncomment the outDir key-value pair.
   - Add the new `dist` directory as a value to to it.
   ```json
   "outDir": "./dist",
   ```

Now, you can compile the typescript file in the `src` directory and get the resulting javascript file inside the `dist` directory.

```sh
npx tsc
```

Now, you can run the compiled javascript file using following command.

```sh
node dist/server.js
```

## Making running the project easier using scripts and dependencies

We are installing nodemon and ts-node as a dev dependency. `-D` is same as `--save-dev`.

**nodemon**: This package restarts the server whenever we do changes to the code.

```sh
npm i -D nodemon
```

**ts-node**: This package automatically work with nodemon and compiles our typescript code into javascript.

```sh
npm i -D ts-node
```

Now, you can easily run the file without compiling the file into javascript.

```sh
npx nodemon src/server.ts
```

> [!IMPORTANT]
> When using nodemon and ts-node, there won't be a compiled javascript file creation in the `dist` directory. But, we use those packages only in development. So, in the production environment there will be a compiled javascript code in the `dist` directory. So, we need to change the value of `main` in the package.json file to the compiled javascript file.

```json
"main": "dist/server.js",
```

Now, we can use **scripts** to create short hand to commands that we are using regularly. We can add them in the script section of `package.json` file.

```json
"scripts": {
    "start": "nodemon src/server.ts"
},
```

> [!IMPORTANT]
> When we are defining scripts in the `package.json` file, we don't need to put the part `npx`.

Now, we can use this script to easily run the commands in terminal. You need to use `npm run` before the script name.

```sh
npm run start
```

Some scripts like `start` have default shorthands too.

```sh
npm start
```

Then, we can also download another dev dependency called **eslint**

```sh
npm i -D eslint
```

After installing we need to create the configuration file for eslint. We need to go through some steps in order to complete the procedure.

```sh
npx eslint --init
```

**eslint**: Helps us to find problems in our code. Some of them can be errors like invalid syntaxes while some of them are bad practices which we should avoid because they can cause problems later.

You can use the following command to check the code and find the problems

`.` : Indicates the directory that files we are checking are in

`--ext`: Indicates the files (the extensions of the files) we are checking in the directory

```sh
npx eslint --ext .ts
```

We can create a script for the above command too.

```json
"scripts": {
    "start": "nodemon src/server.ts",
    "lint": "eslint --ext .ts"
},
```

Now, we can use the shorthand command to run eslint

```sh
npm run lint
```

> [!TIP]
> Executing eslint over the command line is still annoying. So, you install the vscode extension for eslint to make thing easy.

## Added a .gitignore file

> [!NOTE]
> Configurations files and source code file shouldn't be added to the `.gitignore` file. Configuration must be same for every user when we are working as a team.

`.gitignore`: The file that defines the other files and directories in our project that we don't want to commit to git.

We normally push our code to github. Some folders may be just big and we don't need them so we can save space, or there can be files that may contain vulnerable information like database passwords.

> [!TIP]
> We can find default `.gitignore` files from the official repository of github for any type of application.

Here are going to copy a NodeJs `.gitignore` file.

We can see that directories like `node_modules` and `dist` are ignored by `.gitignore` file there.

> [!IMPORTANT]
> We don't need to worry about not pushing `node_modules` directory because all the information about the dependencies are in the package.json file and we only need to run `npm install` command in order to get the `node_modules` directory again.

## Setting up the MongoDB

MongoDB is a **Schemaless** database. This doesn't have a schema than needs to be followed throughout a table in the database.

> [!TIP]
> Another example for a schemaless database is **Firebase**.

You have two choices to deploy this database.

1. Self host it on out own server
2. Host on a hosting provider like **MongoDB Atlas**.

> [!NOTE]
> The benefits of using hosting providers is that they take care of many thing that you would have to do it your self otherwise. (Scaling, Security Concerns, Encryption, Backups etc.)
> And also you would get an GUI to work with Mongodb instead of CLI.
> One downside is we have to pay money for this in the production because we would need to scale up.

We are going to use MongoBD Atlas free tier for this project.

Create a free-cluster from the official site of [MongoDb Atlas](https://www.mongodb.com)

> [!IMPORTANT]
> We can see that `.env` files are in the `.gitignore` file. So, the environment variables like database credentials won't be added to the git repository. We put configurations that depends on where we run the application in `.env` files.

We can create the `.env` file in the `backend` directory of the application. There we can specify the database configuration (`MONGO_CONNECTION_STRING`) and the port (`PORT`).

We need to insert the password and the database name into the correct places of the string.

We need to add the database name, user and the user password in the connection string

- database name: notes_app
- database user: notesuser
- database password: notesuser123

```env
MONGO_CONNECTION_STRING=mongodb+srv://notesuser:notesuser123@notes-cluster.vjv6mi5.mongodb.net/notes_app?retryWrites=true&w=majority&appName=Notes-Cluster
PORT=5000
```

Now, we need to install the **dotenv** package that let's us load .env files.

```sh
npm i dotenv
```

Then we can install **mongoose**. It's gives mongodb object modelling for node.js and makes it easier to work with mongodb database.

```sh
npm i mongoose
```

> [!NOTE]
> Both of the above packages are added as normal dependencies to the project. (into the dependencies section of `package.json` file)

We need to ensure that the environment variables are defined. If the `MONGO_CONNECTION_STRING` is not defined server will get stopped with an error but if the `PORT` is not defined the sever will get started in a undefined port. This is a problem.

For that, we can use a package called **envalid** to manage those environment variables. This has features like errors that will stop the server if environment variables are undefined which can be helpful for us. This is a normal dependency that we need to use in the production as well.

```sh
npm i envalid
```

Now, we can create a `util` directory inside `src` directory to include utility functions. We can create a file for validating environment variables. The name doesn't matter. Here we create a file called `validateEnv.ts`.

## Code Organization

We need to separate the app part that contains the end points and the server part that contains mongoose and actually start the server. We can create another file called `app.ts` and move the endpoint data from the `server.ts` to it.

> [!IMPORTANT]
> This allows us to test the server (everything that is included in the express app) without connecting to the real production database.

## Mongoose MongoDB Models

When we use mongoose, we need to define models for the data that we need to put in our database.

We can create a `models` directory inside the `src` directory and create models inside of it.

> [!NOTE]
> MongoDB Atlas automatically adds id for all the datasets we insert.

## Error Handling in Express

There can be errors like database may be down or may be we wrote some bad code etc. So, we need to handle errors otherwise our server will be down.

**Using Try Catch Blocks**: By using try catch blocks, we can catch the errors and send a responses to the frontend. Our server will not crash if something goes wrong

> [!TIP]
> We don't need to write try catch blocks to handle errors if this is synchronous code. (That means there is no `async` and `await` in the code.). Express is smart enough to forward the error to the error handler automatically.

But we don't want to repeat writing error handling part catch block for every endpoint.

**Setting up an error handler**: This error handler will automatically kick in whenever an error occurs.

> [!IMPORTANT]
> We need to write the error handler below our endpoints. Because middlewares are checked in the order that we have defined them. Because we only want to get to this if an error occurs.

We can refer more about [middleware in express here](https://expressjs.com/en/guide/using-middleware.html).

## Organizing the Codebase

We must not add all the endpoints in the `app.ts` file because we need to add many endpoints with complex logic. So, we need to create `routes` and `controllers` directories in order to organize the endpoints.

## Logging

We can install a package called **morgan** which is a HTTP request logger middleware for node.js. We can see all the requests send into different endpoints on our server.

This is a normal dependency.

```sh
npm i morgan
```

We need to import morgan and add the middleware of morgan to `app.ts` file.

Because we are using typescript when we are importing new packages we would need to install more @types dependencies as well. This is a one example of that.

```sh
npm i -D @types/morgan
```

## HTTP Error Handling in Express

- We can't have the same 500 status code for all the errors. For example we need to have 404 status code for the endpoint not found error. Now it's "Endpoint Not Found" with status code "500".

- Also, when we try to create a note without a title it will give an error because we set title to `required: true`. But it will be the "Internal Server Error" with status "500" as we hard-corded. error message which can be difficult to understand. So, we want to provide our own error message.

We can use another package to easily manage these kinds of http errors called **http-errors**. This should be added as a normal dependency.

```sh
npm i http-errors
```

Now, because we are using typescript we need to install the @types dependency too. This should be a dev dependency.

```sh
npm i -D @types/http-errors
```

The advantage of using this package is when we are creating a http error using http-errors package, both error message and the status are passed inside the error object we created. (Previously when using Error() to create an error we only passed the error message)

- We also need to verify whether the noteId is valid when using getNote endpoint. We need to make custom errors to the both situations.

> [!NOTE]
> In mongoDB every noteId is in a specific format (have a certain length and only certain kind of characters are allowed) like **662fbbce91699528c78ea2fe** . If we have the same format but wrong value we get `null` and if the shape is totally incorrect like **bla** we will get `500: Internal Server Error`.

## User Authentication with Express-Session

Users need to sign-up for the app and every user must see only the notes belong to them. And users also need to be able to delete and update their own notes.

When a user sign-up in a website we need to save them in the database. So we need another mongoose schema.

We can create a new model called `user.ts` inside `models` directory.

Then we need to create the endpoints for user.

First, we are going to create the sign-up endpoint. So let's create `usersControllers.ts` file inside the `controllers` directory.

For hashing the password, We can install the **bcrypt** package.

```sh
npm i bcrypt
```

And we also need the type package for it. This will be a dev dependency.

```sh
npm i -D @types/bcrypt
```

Then, we need to created a route to the userController. We can create a `usersRoutes.ts` file inside the `routes` directory.

We have to register this new route in the `App.ts` file.

When we use the sign-up endpoint first time, the `users` database collection will be created in Mongodb Atlas automatically.

> [!TIP]
> The user should be automatically logged into the account when they sign into the application. They would be needed login to the system again.

We need to create a Express-Session to keep the user logged-in. For that we can use the **express-session** package.

There are two popular ways to keep an user logged in.

1. JWT Tokens
2. Sessions

JWT tokens is the most popular one to use. But it's quiet hard to use them.

> [!CAUTION]
> JWT tokens are **self-contained**. Which means that once an user has it, user can always log in with it. There is no way to invalidate an existing JWT token.

But, invalidating a session after an user signed-in is important. For example when they want to change their password, then they should be logged out from the other places too because their password has been compromised.

But when using JWT tokens this will he a problem. A usual way to handle this is to make JWT tokens live for a short amount of time. And they have to be refreshed to use again.

So, if we say we changed the password. The user can logged in for the rest of the remaining time of the JWT token. Then they have to sign in again.

If we are using JWT tokens, we need to implement a token refresh mechanism which can be bit complicated.

> [!TIP]
> If you have your own server, it's is proffered to use sessions.

Session works like, the user has some kind of keys stored in a cookie. This is easier to implement that JWT tokens.

When we want to remove a session, we just need to

To install express-sessions you need to use the following command.

```sh
npm i express-session
```

We also need types for typescript. This is a dev dependency.

```sh
npm i -D @types/express-session
```

Our session information must be stored somewhere. There are different adaptors that we can use for that.

You can find more details [here](https://www.npmjs.com/package/express-session) from npmjs.com.

We are going to use the **connect-mongo** adapter. But, in the real app it is recommended to use **connect-redis** adaptor. Because Mongodb database is a remote database, it's not on our server directly. (It's on atlas server) This means it takes some time to store this information in the database.

So, make it super fast we can install a redis database in our own server. But setting up redis for development is bit complicated. (So, we are going to use Mongodb for this application)

We now need to install the mongo adaptor.

```sh
npm i connect-mongo
```

We need to define types for the session. For that we are going to create `@types` directory. We are going to create a `session.d.ts` file.

The `.d.ts` files are some kinds of files that used to recognize variables and types by typescript.

> [!IMPORTANT]
> Whenever we import @types files as packages they also will be downloaded as `.d.ts` files in the `node_modules` directory.

Remember that, we need to add this thought the `tsconfig.json` file. Otherwise it won't work. Here, we tell type script where the type definitions are. THis is set to `node_modules/@types` by default. Add our own one there too so typescript knows it can find types from both places.

```json
"typeRoots": ["node_modules/@types","@types"],
```

Then between the last two curly braces of the `tsconfig.json` file add the following code. We use `ts-node` to automatically restart our servers when we change the source code.

```json
    },
    "ts-node": {
        "files": true
    }
}
```

Then we need to configure the express session package in the `app.ts` file. Express-Sessions is another middleware that we have to register here.

This should be declared after `app.use(express.json());` and before we declare `userRoutes` and `notesRoutes`.

We can add the secret to the .env file. You can use whatever string you want.

```env
SESSION_SECRET=nucjdpeauoh32843948nfdjelajkjbcs2323497
```

Then we need to make some changes in the `validateEnv.ts` file too.

```ts
  SESSION_SECRET: str(),
```

We need to create the login controller in the `usersControllers.ts` file and login routes in `usersRoutes.ts` file.
