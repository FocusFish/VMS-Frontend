![Build Status](https://jenkins.focus.fish/buildStatus/icon?job=VMS-Frontend)

# VMS-Frontend

A open source vessel monitoring system written in Angular.

## Setup for development

### Prerequisite

- Docker
- Docker-compose
- Docker-sync

#### Running on windows

To get docker-sync to run correctly you need to use **Ubuntu for Windows** and thus you need to connect your **Docker** for windows to **Docker** inside **Ubuntu for Windows**. Here's a guide on how to do it: [Link to guide](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly).

### Installation guide

Once all the prerequisites is installed, open the project folder with your terminal of choice (unless you're on windows, then you need to use Ubuntu for Windows).

Start by creating an environment file:

```
cp app/src/environments/environment.example.ts app/src/environments/environment.dev.ts
```

Inital run to do the inital npm install:

```
docker-sync start
cd docker && docker-compose --file docker-compose-init.yml up --build && cd ..
```

### Running the code

To run the project we need to start docker-sync again for this project if it's not already started using `docker-sync start` (if you just ran `docker-sync start` you don't need to do it again).

In /docker/Dockerfile Change: CMD [ "npm", "start" ] to CMD [ "npm", "install" ]
Run: `docker-compose up --build`
Change back: CMD [ "npm", "install" ] to CMD [ "npm", "start" ]
Run: `docker-compose up --build`

Run the following command in the project root:  
`docker-compose up --build`

### Alternative setup

If you have built and are running the UVMS-Docker container, and is having trouble running the application via the instructions above, an alternative way is provided in package.json.

Run: `npm run start-same-port`

This will run the application as it normally would via ng serve, but use 8080 instead of 4200/9000 to circumvent CORS-errors.

Note that this will require you to have set up UVMS-Docker (and potentially ais-simulator) as per their instructions.
