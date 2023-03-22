# GMS 2022

Welcome to GMS 2022, React client for the internal management tool of Tonic3. This project was bootstrapped with Vite.

## Local Setup

### Requirements

-   Node.js v18 or higher

### Installation

-   Clone this repository: `git clone https://github.com/Tonic3Dev/gms-2022-client.git`
-   Navigate to the project directory: `cd gms-2022-client`
-   Install dependencies: `npm install`

### Configuration

-   Create a new file .env.local in the root directory of the project
-   Set the values for the following variables (there's an example .env on the repo):
    -   VITE_API_URL: the URL of the API server
    -   VITE_GOOGLE_CLIENT_ID: the client ID for Google authentication (request it to a member of the Octolab team if you dont have one)

### Running the Application

To start the application locally, run the following command in the project directory:

`npm start`

This will start the development server and open the application in your default web browser at http://localhost:3000.

## Deployment

The application is automatically deployed on Render.com using a CI/CD pipeline.

### Production

Deployed from `main` branch to [https://gms.tonic3.com](https://gms.tonic3.com)

### Development

Deployed from `develop` branch to [https://gms.devw3americas.com](https://gms.devw3americas.com)

## Contributions

### Bugs and Feature Requests

Requests for new features and bug reports can be submitted both on the [issues page](https://github.com/Tonic3Dev/gms-2022-client/issues) or the [VivifyScrum board](https://app.vivifyscrum.com/boards/114315) (you'll have to ask for access to the board).

### Pull Requests

Each new feature or bug fix should be developed in a separate branch. When the feature is ready, a pull request should be created to merge the branch into `develop`. The pull request should be reviewed by at least one developer from [Octolab](mailto:octolab@tonic3.com) before being merged.
