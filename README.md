# Charity.Games

We are a community of developers, designers, artists, musicians, and gamers united by a common goal: using the power of gaming to create a positive impact on the world.

## Getting Started

### Preconditions

1. Before attempting to run the project, prepare your .env.local configuration.
2. Install all package dependencies with `npm i`

### Starting the Database

1. start the docker engine.
2. start the postgres local server. `npm run docker:compose:up`
3. **note:** if this is your first time running the project, you will need to push prisma changes `npm run prisma:generate:local && npm run prisma:push:local`

#### Reset the Database

The easiest way to reset your database is to delete the docker container completely and start it again. This will wipe all data and start fresh. Follow the steps above to start the database.

### Starting the Application

1. start all applications and emulators. `npm run serve`
2. (optional) start prisma studio to observe database changes. `npm run prisma:studio:local`
