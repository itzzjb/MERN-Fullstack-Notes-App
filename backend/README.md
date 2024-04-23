# Backend

### Initializing the node server  
`-y` : Configurations for the metadata that we need to do while `npm init` is done automatically using default values. These values are only important if you want to release a package or a library.
```sh
npm init -y
```
This creates the `package.json` file. This has all the configurations for our project. We also list the dependencies here.

>[!NOTE]
> Dependencies are packages we use in our projects. (TypeScript, Bootstrap)

### Installing TypeScript
`--save-dev`: Installs the package as a devDependency.
```sh
npm install --save-dev typescript
```  
This will add typescript to the devDependencies section of the `package.json` file

>[!NOTE]
> There are two types of dependencies. (Normal and Dev)
> **Dev Dependencies**: These dependencies are dependencies that we don't actually need in production. We only need them while we are writing the code. We later save space when we deploy this application for production because these dependencies will be skipped.

This also creates a node_modules directory and a `package-lock.json` file. The node_modules directory contains the packages that we installed.

### TypeScript Configuration File
Every typescript project requires a typescript configuration file.


