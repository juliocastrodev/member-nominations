# DDD-Express-Typescript Talent Nomination API 🏆

## Install and run 💾

Make sure you have `yarn` installed.

The following instructions will assume that you are using it (but it should also work with other package managers like `npm`)

First, we need to install the necessary dependencies. To do this open a command line in the root of the project and run

```bash
yarn
```

Then we can start the application by running the following

```bash
yarn start
```

The application should be accessible from [http://localhost:3000/](http://localhost:3000/)

## Usage 🔬

In most cases you will need an authorization token in order to use the application.

If you are using it for the first time you are probably not going to have any user registered in the persistence layer (which is implemented with `json` files).

There are several ways in which you can populate the `database` with some data. But the easiest way is by using the following script:

```bash
yarn seed
```

This will generate both an admin and a regular member that you can use.

https://user-images.githubusercontent.com/81054864/156026291-25ac0d56-61c2-4747-87cb-7c5247d45ab1.mov

We can register more members using an admin authorization token and the `POST /users` endpoint

https://user-images.githubusercontent.com/81054864/156026397-550edf4c-c2df-44c9-8091-fca1c669d467.mov

If you know the credentials of a certain user, you can get an access token by using the `POST /users/login` endpoint.

https://user-images.githubusercontent.com/81054864/156026521-a63a2766-c809-4dd1-9f91-8f83d4426133.mov

If we are a member, we can nominate a person to join the system using the `POST /nominations` endpoint (notice that you'll need a member authorization token to do this).

https://user-images.githubusercontent.com/81054864/156027134-378a3d39-758c-456b-9396-56072251b0fb.mov

Make sure you nominate 🔝 candidates, the requirements are very demanding, to the point that some nominations are automatically rejected. But don't worry, we will notify you and your nominee if this happens.

To finish, if you are an admin you can visualize the nominations of the system with the `GET /nominations` endpoint, which supports a few filters to make your life easier.

https://user-images.githubusercontent.com/81054864/156027117-4a80ef82-74d0-4d6e-a06d-3c68c4444a0f.mov

## Key points 🧐

The application follows a DDD-based approach and hexagonal architecture.

The code is divided in such a way that, in theory, it would be easy to separate the modules that exist in separate microservices (right now we only have 2 modules: customers and invitations). In addition to that, the services more related to the infrastructure (persistence, authentication, controllers, etc), are, or at least has been the idea, separated from the core/domain of the application.

## Running the tests 🧪

There are 3 types of tests: unit, integration and acceptance tests. There is a specific command to run each type of test, but you can run all of them with the following command:

```bash
yarn test
```

## To improve 📈

- Add documentation/Swagger.
- Implement more tests, at all stages of the pyramid.
- The approach I have followed is very much inspired by the [NestJS](https://nestjs.com/) idea of dividing the complexity of the application into modules, but without certain facilities such as dependency injection or simple integration with tools like class-validator or swagger, following this path might complicate things too much, although as a positive point it should be noted that there is a fairly granular control of the server configuration with this approach.
- I didn't have time to implement a real email sending service 😔, but it would be easy to implement thanks to the structure that exists right now.
- At the last moment an issue arose with the production build, it seems that some tsc option needs to be adjusted, so I have kept the nodemon development startup command as the default one since it does not present any problems.

## Author 🦸

Developed by [Julio César Castro López](https://linkedin.com/in/julio-cesar-castro-lopez-b759491b0)
