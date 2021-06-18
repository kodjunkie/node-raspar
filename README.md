# Raspar

Node API for scraping lossless mp3s, albums, EDM tracks, and more.

## Heroku Deployment

Heroku requires some additional dependencies that aren't included on the Linux box that Heroku spins up for you.
To add the dependencies on deploy, add the Puppeteer Heroku buildpack to the list of buildpacks for your app under Settings > Buildpacks.

The url for the buildpack is `https://github.com/jontewks/puppeteer-heroku-buildpack`
