# Backend

## Initializing the node server  
`-y` : Configurations for the metadata that we need to do while `npm init` is done automatically using default values. These values are only important if you want to release a package or a library.

`npm`: Node Package Manager (build tool like maven and gradle)

```sh
npm init -y
```
This creates the `package.json` file. This has all the configurations for our project. We also list the dependencies here.

>[!NOTE]
> Dependencies are packages we use in our projects. (TypeScript, Bootstrap)

## Installing TypeScript

**TypeScript**: This is superset of JavaScript that you will be able to declare the type of variables. Similar to Java, Kotlin and Swift.

`--save-dev`: Installs the package as a devDependency.
```sh
npm install --save-dev typescript
```  
This will add typescript under the devDependencies section of the `package.json` file

>[!NOTE]
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

`npm i` is  the short term for `npm install`
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

>[!TIP]
> If you want to install a specific version of a dependency we can use a command like `npm install express@4.18.2` 


## Starting a Express server written in Typescript

Normally, if we are using a javascript file we just need to use a command like following.
```sh
node index.js
```
But here we are using typescript. The above command only work for javascript files.

>[!WARNING]
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
    ```sh 
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

>[!IMPORTANT]
> When using nodemon and ts-node, there won't be a compiled javascript file creation in the `dist` directory. But, we use those packages only in development. So, in the production environment there will be a compiled javascript code in the `dist` directory. So, we need to change the value of `main` in the package.json file to the compiled javascript file.

```sh
"main": "dist/server.js",
```

Now, we can use **scripts** to create short hand to commands that we are using regularly. We can add them in the script section of `package.json` file. 
```sh
"scripts": {
    "start": "nodemon src/server.ts"
},
```

>[!IMPORTANT]
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
```sh
"scripts": {
    "start": "nodemon src/server.ts",
    "lint": "eslint --ext .ts"
},
```

Now, we can use the shorthand command to run eslint
```sh
npm run lint
```

>[!TIP]
> Executing eslint over the command line is still annoying. So, you install the vscode extension for eslint to make thing easy.

## Added a .gitignore file 

> [!NOTE]
> Configurations files and source code file shouldn't be added to the `.gitignore` file. Configuration must be same for every user when we are working as a team.


`.gitignore`: The file that defines the other files and directories in our project that we don't want to commit to git.

We normally push our code to github. Some folders may be just big and we don't need them so we can save space, or there can be files that may contain vulnerable information like database passwords.

>[!TIP]
> We can find default `.gitignore` files from the official repository of github for any type of application.

Here are going to copy a NodeJs `.gitignore` file.

We can see that directories like `node_modules` and `dist` are ignored by `.gitignore` file there.

>[!IMPORTANT]
> We don't need to worry about not pushing `node_modules` directory because all the information about the dependencies are in the package.json file and we only need to run `npm install` command in order to get the `node_modules` directory again.


## Setting up the MongoDB 

MongoDB is a **Schemaless** database. This doesn't have a schema than needs to be followed throughout a table in the database.

>[!TIP]
> Another example for a schemaless database is **Firebase**.

You have two choices to deploy this database.
1. Self host it on out own server
2. Host on a hosting provider like **MongoDB Atlas**. 

>[!NOTE]
> The benefits of using hosting providers is that they take care of many thing that you would have to do it your self otherwise. (Scaling, Security Concerns, Encryption, Backups etc.) 
> And also you would get an GUI to work with Mongodb instead of CLI.
> One downside is we have to pay money for this in the production because we would need to scale up.

We are going to use MongoBD Atlas free tier for this project. 

Create a free-cluster from the official site of [MongoDb Atlas](https://www.mongodb.com)






