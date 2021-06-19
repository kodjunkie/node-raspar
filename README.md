# Raspar

Node API for scraping lossless mp3s, albums, EDM tracks, and more
with caching support for faster response time.

## Use Programmatically

Raspar exports a resolver function which accepts a configuration option as argument and returns a promise for all available methods.

```javascript
// with default driver
const Raspar = require("raspar")();

// or by passing the driver
const Raspar = require("raspar")(options);
```

### Using ES6

```javascript
import raspar from "raspar";

// with default driver
const Raspar = raspar();

// or by passing the driver
const Raspar = raspar(options);
```

## Available Drivers

- `zippyshare (default)`

## Available Methods

- `Raspar.search()`

## Running / Deploying the API

This is the first step if you're trying to either run it with or without using `Docker`.
In terminal run the following commands to get the code on your machine.

```bash
# first clone the repo
$ git clone https://github.com/kodjunkie/raspar.git
# change directory
$ cd raspar
# chmod the cache directory
$ sudo chmod -R 777 temp/
```

### Without Docker

Run these additional commands

```bash
# install dependencies
$ npm install
# start thr server
$ npm start
```

### With Docker

Run these additional commands

```bash
# build the container
$ docker build -t raspar .
# run the container mapping the ports
$ docker run -it -p 3000:3000/tcp raspar
```

### Development with Docker

Run these additional commands

```bash
# To boot-up first time only or whenever docker file is modified (builds the containers)
$ docker-compose up --build
# To boot-up without building the containers (regular use)
$ docker-compose up
# To shut-down
$ docker-compose down
```

<!-- ### Heroku (In progress)

Heroku requires some additional dependencies that aren't included on the Linux box that Heroku spins up for you.
To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the list of buildpacks for your app under Settings > Buildpacks.

The url for the buildpack is `https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack` -->
