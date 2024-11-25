# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker Desktop](https://www.docker.com/get-started/)

## Downloading

```
git clone https://github.com/Eremor/nodejs2024Q3-service.git
```
```
git checkout feature-week-3
```

## Installing NPM modules

```
npm install
```
Rename file `.env.example` to `.env`

## Running application

```
docker-compose up --build
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing **http://localhost:4000/doc/**
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Stopping application

```
docker-compose down
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Logging

Logs are saved to files in Docker Desktop
`
  Volumes -> nodejs2024q3-service_app_logs
`

To check file size rotation, change the `LOG_FILE_MAX_SIZE` variable in the `.env` file to 1 and perform some manipulations with the application so that the logs are more than 1 KB of data

To change the logging level, change the `LOG_LEVEL` parameter in the `.env` file to one of the following: `'error', 'warn', 'log', 'debug', 'verbose'`

## Scanning

```
npm run scan
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
