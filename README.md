# todo-pwa

## Requirements

- Git
- Docker
- Docker Compose
- GNU/Make

Command | Description
---|---
`make install` | Install the Node.js dependencies
`make start` | Start the Docker Compose services in the background
`make stop`| Stop the Docker Compose services
`make restart` | Restart the Docker Compose services in the background
`make development` | Build the development files.
`make production` | Build the production files.

## Yarn with Docker Compose

```console
$ docker-compose run --rm yarn --help
```
