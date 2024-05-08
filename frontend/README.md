# Frontend

You can refer to the [documentation](https://create-react-app.dev/docs/getting-started) to learn more.

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

## Downloading React Bootstrap

For guidance we can refer the [documentation](https://react-bootstrap-v4.netlify.app/getting-started/introduction/).

We can install react bootstrap using the following command

```sh
npm install react-bootstrap bootstrap@4.6.0
```

Then we need to import bootstrap css into `index.tsx` file.

```tsx
import "bootstrap/dist/css/bootstrap.min.css";
```

> [!NOTE]
> We need to import bootstrap on the very top of the `index.tsx` file. (Order is important for these imports)

## How React Renders the Output?

The `index.tsx` is file is that initializes the react app. For this it uses the `index.html` file in the `public` directory and the `app.tsx` file.

The `public` directory contains the `index.html` file, images, `favicon.ico` file etc.

Code of the actual app live inside `app.tsx` file. We can create different files for different files and components but they will be somehow included in `app.tsx` file.

The `index.html` file contains the meta data of the application. And also there is a `<div>` that has a id called `root`. The `app.tsx` will be rendered there by `index.tsx`.

`index.html`:

```html
<div id="root"></div>
```

`index.tsx`:

```tsx
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## Declarative UI Explained

`app.tsx`

```tsx
// We need to import useState from react to use the state
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "react-bootstrap";

function App() {
  // Here we want something to save the current state of the application
  // We need to notify react to reach out to UI to display the new values
  // We can create a state variable to store the current state of the application
  // clickCount is the state variable and setClickCount is the function to update the state
  // Because we initialized the state with 0, clickCount is 0
  const [clickCount, setClickCount] = useState(0);

  // The return statement returns the actual UI element
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Januda Bethmin Is Here</p>
        {/* Button is a react-bootstrap component */}
        {/* We can pass the clickCount variable to the Button component */}
        {/* We can set a onClick event listener to the button and call the setClickCount function to update the state */}
        {/* The clickCount will be incremented once the button is clicked*/}
        <Button onClick={() => setClickCount(clickCount + 1)}>
          Clicked {clickCount} times
        </Button>
      </header>
    </div>
  );
}

export default App;
```

## Fetching Data in React

Before fetching the notes from the database we need to create a model for notes. (just as the backend)

We can create `models` directory inside the `src` directory and create a `notes.ts` file.

## CORS policy

We need to separately start both frontend and the backend of the application now. Even both of them are running successfully we can see that we get an error from the frontend that saying that ** Access to fetch at http://localhost:5000/api/notes from the origin http://localhost:3000 has been blocked by CORS policy ... **

**CORS**: Cross-Origin Resource Sharing

CORS is a security mechanism that doesn't allow our front-end to fetch data from the server because they are on different addresses. (localhost:3000 of frontend and localhost:5000 of backend count as different addresses)

There are 2 ways to get around this,

1. We have to configure the server as localhost:3000 as of that we will be allowed to fetch data from localhost:5000 address
2. Both the frontend and the backend runs on the same address

Later, in production we deploy everything to the same url. Our server code will be behind the `/api/` to identification.

This CORS policy is actually enforced only by browsers (like chrome). That's why postman was able to successfully connect to the backend server and fetch data. (because postman is not a browser it's a development tool)

> [!NOTE]
> React renders the UI twice every time. This will only happen in the development not in production. This feature is implemented by react to make it easy to debug the code. (That's why when we get an error alert we get it twice every time)

In the development in order to connect to the backend from the frontend and get data we need to add a proxy. This will basically run the backend in the same server as the frontend. (get the backend to the localhost:3000/api... and the frontend in localhost:3000 address)

We can add a proxy by going to `package.json` file of the frontend and adding the following lines of code. We need to add that on top of dependencies. the value to the `proxy` key will be the basic address of the backend server.

```json
"proxy": "http://localhost:5000",
"dependencies": {
```

> [!IMPORTANT]
> The proxy approach only works because we have our own backend server and a frontend. But if we want to build a public api that different clients can access, then we must set up cors properly to allow these different origins.

We can use `cors` package in the backend for setup that. But here we don't need that because we are not building a public api.

You can find information about cors package [here](https://www.npmjs.com/package/cors).

## Creating React Components

We need to create a component that contains the layout of each note. We can create a `components` directory inside the `src` directory.

The `components` directory will contain all the single components like models and pages. For now, we can create a `Note.tsx` file to create the notes component. The file should be a `.tsx` file here.

> [!IMPORTANT]
> We are naming these modules in starting with a capital letter. ex - App.tsx, Note.tsx ...

React components comes in 2 forms.

1. As a class (old method)
2. As a function (new method)

> [!NOTE]
> Note that we can created a function App() in `App.tsx` file too.

We can get templates of many components from the bootstrap library [component section](https://react-bootstrap.netlify.app/docs/components/accordion)

## Adding CSS Modules

We can remove the default `App.css` file. Also, we are not planning to use global css file. We are going to use css modules instead.

By using models we can reduce clashes of css styling throughout the application by having all of them in global files.

We need to remove the import of the `App.css` from the `App.tsx` file and remove the `className="App"` statement from the div inside return function of App().

We have another css file called `index.css` file, which is imported in the `index.tsx` file.

We can use this file as our global css file because even we are using css modules we need have a one single global css file in order to setup styles that we need to setup once globally not for each component. (like the font, background etc.)

We can move all of our css files into a separate directory called `styles` inside `src` file.

Then, we can change the name of `index.css` as `global.css`.

Remember to change the import in `index.tsx` file as follows.

```tsx
import "./styles/global.css";
```

We can create a css module as `Note.module.css` to the Note react component we created in the `Note.tsx` file.

Import the `Note.module.css` file to the `Note.tsx` file.

```tsx

```

## Layout of the Application

We can find more about layouts we can have using the [documentation](https://react-bootstrap.netlify.app/docs/layout/grid).
