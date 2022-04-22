# GMS 2022

This project was generated using [Nx](https://nx.dev) on `Node v17.4.0` & `NPM 8.3.1`

To replicate:

````

npx create-nx-workspace@latest gms-micro

> ✓ React

> ✓ CSS Styling

> x Nx Cloud

````

## Development server

Requirements: 
- `node v17.4.x`
- `npm v8.3.x`
- `nx v13.9.x` (`npm i -G nx@13.9.5`)

`npm run start-dev` to start the development server on port 3000.
 
## Production server

Requirements: 
- `node v17.4.x`
- `npm v8.3.x`
- `nx v13.9.x` (`npm i -G nx@13.9.5`)
- `docker CLI (v18 or higher)`
- *recommended* `docker desktop 4.x.x`

`npm run start-prod` to start the production server on port 3000.
> Make sure to have docker running on the background.

*Sometimes an error message appears on console when running this script. This is normal (common bug on the **nx build** command) and can be fixed by running it again*.

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

generateReactMicrofrontEntrypoint('myappname', mainComponent);
```

Finally, we must add the micro-app to the deploy configuration. You can find it on `libs/deploy/src/lib/deploy.json` and will have this format:

```
{
    "apps": [
        {
            "name": "myappname",
            "path": "/myapppath",
            "devPort": 30XX, 
            "serveOn": {
                "production": false,
                "development": true
            },
            "allowedRoles": ["myapprole"], // 
            "label": "My App"
        },
        ...
    ]
}
```

- pame: the name of the micro-app **make sure that it's unique and that matches the assigned name on the entrypoint generation (see line 126 of this file)**.
  
- path: the route used by react-router-dom to generate the *Route* element.
  
- devPort: the port used by the development server to serve the micro-app to the main routing system **Can't be 3000 and can't overlap other ports**.
  
- serveOn: booleans that determine if your app will be served on production and on development.
  
- allowedRoles: if your app access role-protected endpoints on the API (therefore not any user can use it), you have to specify the role name/s that can access it so the `home` app can detect which apps the authenticated user can access through the roles on the JWT token.

- label: app name displayed to the user in links, navbar, etc.

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