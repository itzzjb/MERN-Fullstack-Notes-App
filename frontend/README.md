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

##
