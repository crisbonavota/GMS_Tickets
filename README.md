# GMS 2022
This project was generated using [Nx](https://nx.dev) on `Node v17.4.0` & `NPM 8.3.1`

To replicate:
````
npx create-nx-workspace@latest gmsmicro
> ✓ React
> ✓ CSS Styling
> x Nx Cloud
````

## Generate an application

To maintain the micro-frontend structure, you must create an application (independent web-app) per service.

Run `nx g @nrwl/react:app my-app` to generate an application.

Take advantage of the @gms-micro/microfront-utils library to render the application as a microfrontend (don't forget to add it to the container app.tsx).

> You can also combine frameworks, as Angular, Vue, etc.

## Generate a library

  To share components between applications, you must create a library (similar to an app but shared between apps)

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> A library can also consist of a file exporting common assets (images, css files, etc.) between components

Libraries are shareable across libraries and applications. They can be imported from `@gms-micro/mylib`.

## Development server

If you want to run an application invidually, you can just serve it with `nx run my-app:serve --port=1234` and the app will run on your port.

However, being a micro-frontend architecture with a main router app (see `container` app on the repo), we want to be able to serve multiple applications through multiple ports but access to them through the same domain but different route; that's why we use `concurrently`

To run multiple applications: `concurrently "nx run container:serve"  "nx run app-1:serve --port=3001"  "nx run app-2:serve --port=3002"`
> Make sure to scape the " if you paste this code on an npm script
> `npm i -g concurrently`


And you'll have a routing system on the previously mentioned `container` app: 

    const  App1 = () =>  <MicroFrontend  name="app-1"  host={"http://localhost:3001"}  />  
    const  App2= () =>  <MicroFrontend  name="app-2"  host={http://localhost:3002}  />    
    
    const  App = () => {    
	    return (    
		    <Routes>   
			    <Route  path="/app1"  element={<App1 />}  />    
			    <Route  path="/app2"  element={<App2 />}  />    
		    </Routes>    
	    )    
    }

Look up in the repo the differences between the entrypoints (`main.tsx`) of the `container` app vs the rest of the apps
> The container app renders multiple apps and a common app only render itselfs

## Build
// TODO: fill this section

## Running unit tests

Run `nx test my-app` to execute the unit tests of an app via [Jest](https://jestjs.io).
> You can also run `nx run-many --all --target=test --parallel` to execute the tests of every app simultaneously

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of the project

## Authentication in Micro-Frontend architecture

Our `login` app handles the auth API connections, and since services can't share their current state, every app that you create that needs the JWT token / Authenticated user data must redirect to /sign-in sending `redirect=appRoute` as an URL query parameter (`?redirect=myapp`). Then, the sign-in component will handle the JWT token retrieval from cookies or generation from API, and will redirect to the caller route (`appRoute`) sending as URL query parameters the authentication header + authenticated user (`?header=authHeader&user=authUser`) so the original app that asked for the auth data can retrieve it from the URL.

We use `react-auth-kit` to handle the auth token expiration and persist the sign-in between sessions (cookies)