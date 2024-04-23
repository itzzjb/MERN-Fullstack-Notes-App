# Backend

### Initializing the node server  
`-y` : Configurations for the metadata that we need to do while `npm init` is done automatically using default values. These values are only important if you want to release a package or a library.

`npm`: Node Package Manager (build tool like maven and gradle)

```sh
npm init -y
```
This creates the `package.json` file. This has all the configurations for our project. We also list the dependencies here.

>[!NOTE]
> Dependencies are packages we use in our projects. (TypeScript, Bootstrap)

### Installing TypeScript

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

### TypeScript Configuration File
Every typescript project requires a typescript configuration file. This contains the information on how typescript should behave.

`-tsc`: Typescript Compiler
```sh
npx tsc --init
```

`npx`: Node Package Execute (executes installed packages)

This creates a `tsconfig.json` file. 

### Installing Express

**Express** : Express is the framework that allows us to make the server. This allows us to write server code, end points etc.

**Node** : Node is just the foundation that the code runs on.

`npm i` is  the short term for `npm install`
```sh
npm i express
```

We don't use `--save-dev` because Express is a normal dependency that is need in development and production both.

This will add express under the dependencies section of the `package.json` file

### Installing Types for Express

Because we are writing the code in typescript we need to install the package that consists the types, so that our code works properly and typescript understand the types.

`--save-dev`: Installs the package as a devDependency.
```sh
npm i --save-dev @types/express
```
This will add typescript under the devDependencies section of the `package.json` file

>[!TIP]
> If you want to install a specific version of a dependency we can use a command like `npm install express@4.18.2` 



