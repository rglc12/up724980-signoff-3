# UP724980-signoff-3 for CLOCOSS Unit

## Prerequisites

- Ensure that [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) is installed on your machine
- Ensure that [Node.js](https://nodejs.org/en/download/package-manager/) is installed on your machine
- Ensure that all desired urls are added to your gcloud credentials on the google console

## Installation

- Run the following command in cmd:
``` git clone https://github.com/rglc12/up724980-signoff-3.git```
- Direct yourself to the ```up724980-signoff-3/api/index.js``` file to make sure that you have included your CLIENT_ID in the following:
``` api.use(GoogleAuth("CLIENT_ID.apps.googleusercontent.com")); ```
- Change the configuration of ```up724980-signoff-3/app.yaml``` and ensure that the ```service``` variable matches your desired app engine
- Run ``` npm install ``` in the up724980-signoff-3/ directory

## Running Application
### Locally:
Once you have completed the npm install, simply run the server.js file in the up724980-signoff-3/ directory:
``` node server.js ```

### Deploy as an App in gcloud
Complete the steps for running the application locally (above), but use the command ```gcloud app deploy```

## Tests

All tests can be found in the ```up724980-signoff-3/static/index.js``` file. As of 11/01/2017, all tests pass.
