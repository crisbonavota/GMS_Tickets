# GMS 2022

This project was generated using [Nx](https://nx.dev) on `Node v17.4.0` & `NPM 8.3.1`

To replicate:

````

npx create-nx-workspace@latest gms-micro

> ✓ React

> ✓ CSS Styling

> x Nx Cloud

````

## Generate an application

To maintain the micro-frontend structure, you must create an application (independent web-app) per service.
> This application can run on any framework, since it will be rendered independently from the rest of the workspace.
 
Run `nx g app my-app` to generate an application.
> Take a look an NX generators docs to find out how to choose frameworks on the generator, since by default it will be a React application.

## Generate a library

To share components between applications, you must create a library (similar to an app but shared between apps)

Run `nx g lib my-lib` to generate a library.
> Take a look an NX generators docs to find out how to choose frameworks on the generator, since by default it will be a React application.
 
> A library can also consist of a file exporting common assets (images, css files, etc.) between components

Libraries are shareable across libraries and applications. They can be imported from `@gms-micro/mylib`.

## Integrate an application to the main routing system

Microfrontends can be served individually on custom domains; however, in this project, we're using a single SPA architecture were a main `container` app is taking care of putting together all apps under the same domain and routing system.
> You can find this `container` app under apps/container

Before integrating the micro apps to the main routing system, you must change the rendering method of the app.

By default, any micro-frontend generated using an NX generator will be setted up for rendering to the DOM directly; we must change this behaviour so the `container` app can render this micro-app at will

#### Example in React:

First, we must use our custom webpack configuration so the building process will generate an asset-manifest file - *this process will probably be the same across any application independently of the framework* 
- Access the nx app configuration (by default, it's in *project.json* on the root foolder of the app)
- Change the `webpackConfig` option to the custom one:
```
"targets": {
	...
	"build": {

		...

		"options": {

			...

			"̶w̶e̶b̶p̶a̶c̶k̶C̶o̶n̶f̶i̶g̶"̶:̶ ̶"̶@̶̶̶n̶̶̶r̶̶̶w̶̶̶l̶̶̶/̶̶̶r̶̶̶e̶̶̶a̶̶̶c̶̶̶t̶̶̶/̶̶̶p̶̶̶l̶̶̶u̶̶̶g̶̶̶i̶̶̶n̶̶̶s̶̶̶/̶̶̶w̶̶̶e̶̶̶b̶̶̶p̶̶̶a̶̶̶c̶̶̶k̶̶̶"̶
			"webpackConfig": "webpack.config.js"
		}
	}
},
```
- Make sure that the serve targets are properly configured (`development` and `production` must be explicitly specified):
```
"targets": {
	...
	"serve": {
		"options": {
			"buildTarget": "<appname>:build:development",
			"hmr": true
		},
		"configurations": {
			"production": {
				"buildTarget": "<appname>:build:production",
				"hmr": false
			}
		}
	}
},
```

After this, we must modify the entrypoint of the app to avoid rendering it to the DOM automatically and rendering it at the `container` app command. We have a lib already setted up to do this for your, all you have to do is calling the lib function for your framework and passing the main component and app name as argument.
> By default, the entrypoint is `main`, located on the `src` folder of the app (`myapp/src/main`)

#### Example in React:

```
import App from './app/app';
import { StrictMode } from  'react';
import { generateReactMicrofrontEntrypoint } from  '@gms-micro/microfront-utils';

export const mainComponent = 
	<StrictMode>
		<App />
	</StrictMode>;

generateReactMicrofrontEntrypoint('myapp', mainComponent);
```

**Take a look at the *deploy configuration* section for your app to be served on development**

## Development server

Requirements: 
- `node v17.4.x`
- `npm v8.3.x`
- `concurrently - any version`  (`npm i -G concurrently`)
- `nx v13.9.x` (`npm i -G nx@13.9.5`)

If you want to run an application invidually, you can just serve it with `nx run my-app:serve --port=1234` and the app will run on your port.
 
However, if you want to run the `container` app with the full routing system, you have to run them simultaneously on different ports (being the `container` app the port 3000) and the `container` app will take care of rendering them under the same host.

`concurrently "nx run container:serve --port:3000" "nx run app-1:serve --port=3001" "nx run app-2:serve --port=3002"`
> Make sure to scape the " if you paste this code on an npm script
> `"start": "concurrently \"nx run container:serve --port 3000\"  \"nx run app-1:serve --port=3001\"  \"nx run app-2:serve --port=3002\""`

**For an app to work on the development server, it has to meet this requirements:**
- The app name is present on the `apps` environmental variable of the `container` app (`apps/container/environments/environment.ts`)
- The app is present on the `start` script/command and the port is explicitly specified as the previous app port + 1.
- The  position of the app on the `start` script command is the same that the position of the app name on the `apps` environmental variable:
>  ✓ Works
> `apps = "login,reports,home"`
>  `"start": "concurrently \"nx run container:serve --port 3000\"  \"nx run login:serve --port=3001\"  \"nx run reports:serve --port=3002\" \"nx run home --port=3003\""`

>  X Doesn't work
>  `apps = "login,reports,home"`
>  `"start": "concurrently \"nx run container:serve --port 3000\"  \"nx run reports:serve --port=3001\"  \"nx run login:serve --port=3002\" \"nx run home --port=3003\""`
> Both `login` and `reports` won't work properly because the `container` is looking for `login` on port 3001 and `reports` on port 3002 (this is because of the order that they're presented on the `apps` variable) but the server is serving `login` on 3002 and `reports` on 3001.
 
## Production server

Requirements: 
- `node v17.4.x`
- `npm v8.3.x`
- `nx v13.9.x` (`npm i -G nx@13.9.5`)
- `docker CLI (v18 or higher)`
- *recommended* `docker desktop 4.x.x`

 An express/helmet production server is already setted up, (`server.js` ) we just have to run it:
  - `nx run-many --all --target=build --parallel` // Create the production release of the apps
  - `docker build -t gms-img .` // Create the docker image through the dockerfile
  - `docker run -dp 3000:80 --name gms-front gms-img` // Start a container running on your localhost (on the 3000 port but you can change it at will)

You can access to the production app through the 3000 port of your localhost.

**For an app to work on the production server, it has to be set on the APPS environmental variable of the `dockerfile`**, that has this format: `ENV APPS=APP1,APP2,YOURAPP`.

## Running unit tests

Run `nx test my-app` to execute the unit tests of an app via [Jest](https://jestjs.io).

> You can also run `nx run-many --all --target=test --parallel` to execute the tests of every app simultaneously  

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).
  
## Understand your workspace
  
Run `nx graph` to see a diagram of the dependencies of the project

## Authentication logic in Micro-Frontend architecture
  
Our `login` app handles the auth API connections, and since services can't share their current state, every app that you create that needs the JWT token / Authenticated user data must redirect to /sign-in sending `redirect=appRoute` as an URL query parameter (`?redirect=myapp`). Then, the sign-in component will handle the JWT token retrieval from cookies or generation from API, and will redirect to the caller route (`appRoute`) sending as URL query parameters the authentication header + authenticated user (`?header=authHeader&user=authUser`) so the original app that asked for the auth data can retrieve it from the URL. 

We use `react-auth-kit` to handle the auth token expiration and persist the sign-in between sessions (cookies)

## How to integrate authentication on your app

There's a handy library already integrated in the workspace to get the auth data (JWT token + authenticated user info)

On your app entrypoint (refer to the ***Integrate an application to the main routing system*** section if you don't know what this is), just call the `getAuthHeader` method from `@gms-micro/auth-methods`.

#### Example in React

```
import App from './app/app';
import { StrictMode } from  'react';
import { generateReactMicrofrontEntrypoint } from  '@gms-micro/microfront-utils';
import { getAuthHeader } from  '@gms-micro/auth-methods';

const  authHeader = getAuthHeader('reports');

export const mainComponent = 
	<StrictMode>
		// Your App has to be configured to receive this info as prop
		{authHeader && <App  authHeader={authHeader}  />}
	</StrictMode>;

generateReactMicrofrontEntrypoint('myapp', mainComponent);
```

Calling the library methods will handle the redirection to the sign in page and the posterior removal of the query parameters from the URL.