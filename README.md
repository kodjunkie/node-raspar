# Raspar

Node API for scraping lossless mp3s, albums, EDM tracks, and more.

## Use Programmatically

Raspar exports a function which accepts the driver as argument and returns a promise for all available methods.

```javascript
// with default driver
const Raspar = require("raspar")();

// Or by passing the driver
const Raspar = require("raspar")("driver");
```

### Using ES6

```javascript
import raspar from "raspar";

// with default driver
const Raspar = raspar();

// Or by passing the driver
const Raspar = raspar("driver");
```

## Available Drivers

- `zippyshare`

## Available Methods

- `Raspar.search()`

## Deploying the API

### Docker

In terminal build and run with the following commands

```bash
$ docker build -t raspar .

$ docker run -it -p 3000:3000/tcp raspar
```

### Heroku (In progress)

Heroku requires some additional dependencies that aren't included on the Linux box that Heroku spins up for you.
To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the list of buildpacks for your app under Settings > Buildpacks.

The url for the buildpack is `https://github.com/CoffeeAndCode/puppeteer-heroku-buildpack`
