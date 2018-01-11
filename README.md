# UP724980-signoff-3 for CLOCOSS Unit

## Prerequisites

- Ensure that [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) is installed on your machine
- Ensure that [Node.js](https://nodejs.org/en/download/package-manager/) is installed on your machine

## Installation

- Run the following command in cmd:
``` git clone https://github.com/rglc12/up724980-signoff-3.git```
- Direct yourself to the ```up724980-signoff-3/api/index.js``` file to make sure that you have included your CLIENT_ID in the following:
``` api.use(GoogleAuth("CLIENT_ID.apps.googleusercontent.com")); ```
- Run ``` npm install `` in the up724980-signoff-3/ directory

## Running Application

Once you have completed the npm install, simply run the server.js file in the up724980-signoff-3/ directory:
``` node server.js ``

## Tests

All tests can be found in the ```up724980-signoff-3/static/index.js``` file. As of 11/01/2017, all tests pass.
