# Livability Node

Node.js/Hapi powered web app.

## Setup from a fresh repo

Install all the dependencies:

    npm install

## Development

Interact with this project via npm. The following commands are available:

Start the app in development mode, restarting the app whenever a file changes:

    npm start

## Adding a dependency

To add a new npm module dependency to the project and automatically adding an entry in package.json:

	npm install <package name> --save

## App structure

### Directories:

- `data`: Contains raw data in csv format and parsing function
- `public`: Contains static files that are used by the browser
- `routes`: Handle the HTTP requests
- `views`: Contain the handlebars templates 



