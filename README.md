# Way Farer

[![Build Status](https://travis-ci.org/Gtstride/way-farer.svg?branch=master)](https://travis-ci.org/Gtstride/way-farer.svg?branch=master)
[![Coverage Status](https://github.com/Gtstride/way-farer/tree/master)](https://github.com/Gtstride/way-farer/tree/master)

WayFarer is a public bus transportation booking server

## Minimum Required Features

- User can **sign up**
- User can **login**
- Admin can **add a bus for a trip**
- Admin can **get all bus**
- Admin can **create a trip**
- Admin can **cancel a trip**
- Both Admin and Users can **see all trips**
- Users can **book a seat on a trip**
- An Admin can **see all bookings** while user can **see all of his/her bookings**
- Users can **delete their booking**


## Technologies

- Node JS
- Express
- Mocha & Chai
- Validatorjs
- ESLint
- Babel
- Travis CI
- Code Climate & Coveralls

## Requirements and Installation

To install and run this project you would need to have listed stack installed:

- Node.js

- To run:

```sh
git clone <https://github.com/Gtstride/way-farer.git>
cd WayFarer-API
npm install
npm run start:dev
```

## Testing

```sh
npm test
```

## API-ENDPOINTS

- V1

`- POST /api/v1/auth/signup Create user account`

`- POST /api/api/v1/auth/signin Login a user`

`- POST /api/v1/trips Create a trip`

`- PATCH /api/v1/trips/<:trip_id> Cancel a trip`

`- GET /api/v1/trips See all trips`

`- POST /api/v1/bookings Book a seat on a trip`

`- GET /api/v1/bookings See all bookings`

`- DELETE /api/v1/bookings/<:booking_id> Delete their booking`

## Pivotal Tracker stories

[https://www.pivotaltracker.com/n/projects/2358316](https://www.pivotaltracker.com/n/projects/2358316)

## API

The API is currently in version 1 (v1) and is hosted at
[https://way-farer-app.herokuapp.com/](https://way-farer-app.herokuapp.com/)

## API Documentation

[https://way-farer-app1.herokuapp.com/api-docs/](https://way-farer-app1.herokuapp.com/api-docs/)


## Author

Agho Godstime Omorogbe