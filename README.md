# Talent Nomination API 🏆

## Install and run 💾

Make sure you have `yarn` installed.

The following instructions will assume that you are using it (but it should also work with other package managers like `npm`)

First, we need to install the necessary dependencies. To do that open a command line in the root of the project and run

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

![Seed example](./seed.mov)

We can register more members using an admin authorization token and the `POST /users` endpoint

![Register user example](https://media3.giphy.com/media/oXQBBMLX6IQFRlD6mU/giphy.gif?cid=790b7611484be51fa7b00a0dd7ce31d68c83f6716bfe4acd&rid=giphy.gif&ct=g)

If you know the credentials of a certain user, you can get an access token by using the `POST /users/login` endpoint.

![Login user example](https://media4.giphy.com/media/tzMaRfuKUrRUJkyaM8/giphy.gif?cid=790b761113ab4fac6f6bce61d21cc16ea7fa95ea06ae21be&rid=giphy.gif&ct=g)

If we are a member, we can nominate a person to join the system using the `POST /nominations` endpoint (notice that you'll need a member authorization token to do this).

![Nominate user example](https://media4.giphy.com/media/iJt2iNmgeTYgGIINe9/giphy.gif?cid=790b7611ba0e3a4b4e717935d70ed1e1b8962cab9ce37fb0&rid=giphy.gif&ct=g)

Make sure you nominate 🔝 candidates, the requirements are very demanding, to the point that some nominations are automatically rejected. But don't worry, we will notify you and your nominee if this happens.

To finish, if you are an admin you can visualize the nominations of the system with the `GET /nominations` endpoint, which supports a few filters to make your life easier.

![Filter nominations example](https://media2.giphy.com/media/zvaK7Et2nS8WoER5HZ/giphy.gif?cid=790b76112c128b4036220742b382baa9bed2b85fac184f08&rid=giphy.gif&ct=g)

## Key points 🧐

The application follows a DDD-based approach and hexagonal architecture.

The code is divided in such a way that, in theory, it would be easy to separate the modules that exist in separate microservices (right now we only have 2 modules: customers and invitations). In addition, we have sought that the different services more linked to the infrastructure of the application (such as persistence, authentication, controllers) are away from the core of our application, that is, we have enhanced the domain above the rest.

## Running the tests 🧪

There are 3 types of tests: unit, integration and acceptance tests. There is a specific command to run each type of test, but you can run all of them with the following command:

```bash
yarn test
```

## To improve 📈

- Add documentation/Swagger.
- Implement more tests, at all stages of the pyramid.
- The approach I have followed is very much inspired by the NestJS idea of dividing the complexity of the application into modules, but without certain facilities such as dependency injection or simple integration with tools like class-validator or swagger, following this path might complicate things too much, although as a positive point it should be noted that there is a fairly granular control of the server configuration with this approach.
- I didn't have time to implement a real email sending service, but it would be easy to implement thanks to the structure that exists right now.
- At the last moment an issue arose with the production build, it seems that some tsc option needs to be adjusted, but I have kept the nodemon development startup command as the main one since it does not present any problem.

## Author 🦸

Developed by [Julio César Castro López](https://linkedin.com/in/julio-cesar-castro-lopez-b759491b0)
