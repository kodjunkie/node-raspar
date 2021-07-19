<h1 align="center">Node Raspar</h1>

<div align="center">

Node API for scraping lossless mp3s, albums, EDM tracks, torrents and more with cache support.

[![Raspar CI](https://github.com/kodjunkie/raspar/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/kodjunkie/raspar/actions/workflows/node.js.yml) <a href="https://github.com/kodjunkie/raspar/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" height="20"></a>

</div>

## Use programmatically

`node-raspar` exports a resolver function which accepts the configuration object as argument and returns a promise for all available methods.

### Installation

In your terminal, simply run

```bash
npm i node-raspar
```

### Configuration (options)

```javascript
const options = {
	driver: "1337x", // default: zippyshare
	// cache configuration, to disable caching set to "false"
	cache: { options: { ttl: 60 * 8 } } || true || false,
};
```

**NOTE:** You can use any promise based cache store engine from this [list](https://github.com/BryanDonovan/node-cache-manager#store-engines), raspar uses [fs-hash](https://github.com/rolandstarke/node-cache-manager-fs-hash) by default.

### Using CommonJs

```javascript
// with default options
const Raspar = require("node-raspar")();

// or by passing custom options
const Raspar = require("node-raspar")(options);
```

<!-- ### Using ES6

```javascript
import raspar from "node-raspar";

// with default options
const Raspar = raspar();

// or by passing custom options
const Raspar = raspar(options);
``` -->

### Examples

```javascript
// Get list results
// Using then / catch
const page = 1;
Raspar.list(page)
	.then((data) => console.log(data))
	.catch((error) => console.error(error));

// Get search results
// Using async / await in an async function
const data = await Raspar.search("avengers", page);
```

## Available Drivers

- `zippyshare (default)`
- `1337x`

## Available Methods

| Drivers      | Search             | List               |
| ------------ | ------------------ | ------------------ |
| `zippyshare` | :heavy_check_mark: | :heavy_check_mark: |
| `1337x`      | :heavy_check_mark: | :heavy_check_mark: |

## Running / Deploying the API

This is the first step if you're trying to either run it with or without using `Docker`
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
$ docker run -it -p 3000:3000 raspar
```

### With Docker Compose

Run these additional commands

```bash
# To boot-up first time only or whenever docker file is modified (builds the container)
$ docker compose up --build
# To boot-up without building the container (regular use)
$ docker compose up
# To shut-down
$ docker compose down
```

<!-- ### Heroku (In progress)

Heroku requires some additional dependencies that aren't included on the Linux box that Heroku spins up for you.
To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the list of buildpacks for your app under Settings > Buildpacks.

The url for the buildpack is `https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack` -->

## Tests

```bash
$ npm test
```

## API Documentation

**NOTE:** `your-domain.com` depends on the address your server is running on.

**Swagger:** [http://your-domain.com/docs](http://your-domain.com/docs)

## License

This project is opened under the [MIT 2.0 License](https://github.com/kodjunkie/raspar/blob/master/LICENSE) which allows very broad use for both academic and commercial purposes.
