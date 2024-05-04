# Frontend

You can refer to the [documentation] (https://create-react-app.dev/docs/getting-started) to learn more.

## Creating a new Vanilla React Project

We can create a Typescript react app using their templates.

We need to call the following command from the root directory.

```sh
npx create-react-app frontend --template typescript
```

The `frontend` directory was automatically created from the above command.

> [!IMPORTANT]
> In react we don't need to install dev dependencies separately. All the dependencies can be installed as normal dependencies. The dev dependencies will be automatically striped away when building the project.

## Checking and fixing if there are vulnerabilities

We can check the information about the vulnerabilities by using the following command.

```sh
npm audit
```

We need to fix these vulnerabilities automatically.

```sh
npm audit fix
```

If, the previous one did't work we can force to fix them.

```sh
npm audit fix --force
```

## .tsx ? .jsx?

If you are using typescript in react you will find `.tsx` files and if you are using javascript you will find `.jsx` files. These files represents a mix of typescript/javascript with HTML.

> React is a **Declarative UI Framework**. HTML and JS is mixed here.

The old approach or UI was **Imperative UI**. There we had the HTML file and the Js file separately. We always have to declare the elements of the ui using HTML and interact with them using Js. We always have to micromanage what we change in which point of time in the ui. (Like changing a value of a element when an action happen)

But in Declarative UI, once you declare a element, how they look, what data they contain then react will automatically keep everything up-to-date.

**Some benefits of using `.tsx` of `.jsx` files**:

- We can keep the UI in sync. (many different variables, elements, states ... )
- We can do stuff like putting for loops directly on HTML
- Allows to create reusable components that we can use in different places in our app. (Because there is no separation between HTML and Js)
