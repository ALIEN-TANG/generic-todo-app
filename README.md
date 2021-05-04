# Generic To-Do App Frontend

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Notes

This repo is a frontend coding sample to showcase my work habits and development thought process. It is a CRUD application that uses the React framework. The "backend" is a fully mocked-out function that uses local storage as its data store. While initially done to fulfill the "frontend OR backend" prompt, this choice to not use a proper database was actually the biggest time-sink, because of the clunkiness of manipulating non-relational data. Future interesting work to add onto this project might include writing out at serverless backend using [Cloudflare workers](https://developers.cloudflare.com/workers/).

Currently, this React app is deployed via [AWS Amplify](https://aws.amazon.com/amplify/). And the "production" app is accessible at [generic-todo-app.alexting.world](https://generic-todo-app.alexting.world/).

## Local Development

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
