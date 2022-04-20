<div align="center">

<h1>Node Raspar 🕷️</h1>

Easily scrap the web for torrent and media files.

[![downloads](https://img.shields.io/npm/dt/node-raspar.svg)](https://www.npmjs.com/package/node-raspar) [![raspar CI](https://github.com/kodjunkie/node-raspar/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/kodjunkie/node-raspar/actions/workflows/node.js.yml) <a href="https://github.com/kodjunkie/node-raspar/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-yellow.svg" alt="License: MIT" height="20"></a>

</div>

## Getting Started

> Raspar exports a resolver function which accepts the configuration object as an argument and returns promises for all available methods.

### Installation

To use Raspar in your project, run:

```bash
npm i node-raspar
```

### Usage

Raspar follows the latest [maintenance LTS](https://github.com/nodejs/Release#release-schedule) version of Node and v14.x or greater is recommended.

#### Configuration

**NOTE:** You can use any promise based cache store engine from this [list](https://github.com/BryanDonovan/node-cache-manager#store-engines), raspar uses [fs-hash](https://github.com/rolandstarke/node-cache-manager-fs-hash) by default.

```javascript
const options = {
	driver: "1337x", // default: zippyshare
	perPage: 12, // results per page (default: 10)
	cache: { options: { ttl: 60 * 8 } }, // to disable caching set to "false"
};
```

**Example 1** - get a list of music files (using the `zippyshare` driver)

```javascript
// initialize by passing a custom options
// or leave empty for default
const raspar = require("node-raspar")(options);

// when using zippyshare driver
// you need to pass a genre as the second argument to the list method
// calling it without passing the genre returns a list of available genres
const page = 1;
const genre = "Hip Hop";

raspar.list(page, genre).then(console.log).catch(console.error);
```

**Example 2** - search for torrent files (using the `1337x` driver)

```javascript
const raspar = require("node-raspar")(options);

(async () => {
	const page = 1;
	const keyword = "avengers";

	const results = await raspar.search(keyword, page);
	console.log(results);
})();
```

## Available Drivers and Methods

| Drivers    | Type      | Search (query, page) | List (page)        |
| ---------- | --------- | -------------------- | ------------------ |
| Zippyshare | `Music`   | :white_check_mark:   | :white_check_mark: |
| 1337x      | `Torrent` | :white_check_mark:   | :white_check_mark: |
| Netnaija   | `Movie`   | :white_check_mark:   | :white_check_mark: |
| Zoro       | `Anime`   | :white_check_mark:   | :white_check_mark: |

## Running / Deploying the API

This is the first step if you're trying to either run it with or without using `docker`
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
# start the server
$ npm start
```

### With Docker

Run these additional commands

```bash
# build the container
$ docker build -t raspar-api .
# run the container mapping the ports
$ docker run --name raspar -it -p 3000:3000 raspar-api
```

### With Docker Compose

Run these additional commands

```bash
# to boot-up first time only
# or whenever docker file is modified (builds the container)
$ docker compose up --build
# to boot-up without building the container (regular use)
$ docker compose up
# to shut-down
$ docker compose down
```

### Deploying on Heroku

Heroku requires some additional dependencies that aren't included on the Linux box that Heroku spins up for you.
To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the list of buildpacks for your app under Settings > Buildpacks.

The url for the buildpack is `https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack`

## API Documentation

**NOTE:** `localhost` refers to the address your server is running on. By default, it runs on port `3000`

**Swagger:** [http://localhost:3000/docs](http://localhost:3000/docs)

## Liked it?

Hope you liked this project, don't forget to give it a star ⭐

<div align="center">
  <a href="https://starchart.cc/kodjunkie/node-raspar">
    <img src="https://starchart.cc/kodjunkie/node-raspar.svg" width="600px">
  </a>
</div>

## Tests

```bash
$ npm test

# or via docker
$ docker exec -it raspar npm test
```

## License

This project is opened under the [MIT 2.0 License](https://github.com/kodjunkie/node-raspar/blob/master/LICENSE) which allows very broad use for both academic and commercial purposes.
