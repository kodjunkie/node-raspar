<h1 align="center">Node Raspar</h1>

<div align="center">

A nodejs API for scraping lossless mp3s, albums, EDM tracks, torrents, files, and more with cache support :racehorse:

[![Raspar CI](https://github.com/kodjunkie/node-raspar/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/kodjunkie/node-raspar/actions/workflows/node.js.yml) <a href="https://github.com/kodjunkie/node-raspar/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" height="20"></a>

</div>

## Usage

Raspar exports a resolver function which accepts the configuration object as an argument and returns a promise for all available methods.

### Installation

In your terminal, simply run

```bash
npm i node-raspar
```

### Configuration (options)

```javascript
const options = {
	driver: "1337x", // default: zippyshare
	perPage: 12, // Results per page (default: 10)
	cache: { options: { ttl: 60 * 8 } } || true || false,
	// cache configuration, to disable caching set to "false"
};
```

**NOTE:** You can use any promise based cache store engine from this [list](https://github.com/BryanDonovan/node-cache-manager#store-engines), raspar uses [fs-hash](https://github.com/rolandstarke/node-cache-manager-fs-hash) by default.

### Using CommonJs

```javascript
// with default options
const raspar = require("node-raspar")();

// or by passing custom options
const raspar = require("node-raspar")(options);
```

<!-- ### Using ES6

```javascript
import raspar from "node-raspar";

// with default options
const raspar = raspar();

// or by passing custom options
const raspar = raspar(options);
``` -->

### Examples

```javascript
// Get list results
// Using then / catch
const page = 1;
raspar.list(page).then(console.log).catch(console.error);

// When using zippyshare driver
// You need to pass a genre as the second argument to the list method
// Calling it without passing the genre returns a list of available genres
raspar.list(page, "Hip Hop").then(console.log).catch(console.error);

// Get search results
// Using async / await in an async function
const results = await raspar.search("avengers", page);
console.log(results);
```

## Available Drivers

- zippyshare (default)
- 1337x

## Available Methods

| Drivers      | search(query, page) | list(page)         |
| ------------ | ------------------- | ------------------ |
| `zippyshare` | :heavy_check_mark:  | :heavy_check_mark: |
| `1337x`      | :heavy_check_mark:  | :heavy_check_mark: |

## Running / Deploying the API

This is the first step if you're trying to either run it with or without using `Docker`
In terminal run the following commands to get the code on your machine.

```bash
# first clone the repo
$ git clone https://github.com/kodjunkie/node-raspar.git raspar
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
$ docker run -it -p 3000:3000 raspar
```

### With Docker Compose

Run these additional commands

```bash
# To boot-up first time only
# Or whenever docker file is modified (builds the container)
$ docker compose up --build
# To boot-up without building the container (regular use)
$ docker compose up
# To shut-down
$ docker compose down
```

### Deploying on Heroku

Heroku requires some additional dependencies that aren't included on the Linux box that Heroku spins up for you.
To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the list of buildpacks for your app under Settings > Buildpacks.

The url for the buildpack is `https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack`

## API Documentation

**NOTE:** `localhost` depends on the address your server is running on. By default, it runs on port `3000`.

**Swagger:** [http://localhost:3000/docs](http://localhost:3000/docs)

## Tests

```bash
$ npm test
```

## License

This project is opened under the [MIT 2.0 License](https://github.com/kodjunkie/raspar/blob/master/LICENSE) which allows very broad use for both academic and commercial purposes.
