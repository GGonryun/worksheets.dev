# Charity.GAmes

## Getting Started

### Preconditions

1. Before attempting to run the project, prepare your .env.local configuration.
2. Install all package dependencies with `npm i`

### Supporting Subdomains

Charity.Games supports subdomains for multitenancy, when working locally we must edit our hosts file to support these subdomains.

1. sudo code /etc/hosts
2. replace the contents of the file with the following:

```
127.0.0.1 localhost charity.local official.charity.local test.charity.local local.charity.local example.charity.local
255.255.255.255 broadcasthost
::1 localhost
```

3. (optional) add extra subdomain tenants, but by default the project will use the above subdomains.

### Running the Project Locally

1. Start the docker engine.
2. Start the postgres local server. `npm run docker:compose:up`
3. If this is your first time running the project, you will need to push prisma changes `npm run prisma:generate:local && npm run prisma:push:local`
4. Start applications. `npm run serve`
5. Optionally: start prisma studio to observe database changes. `npm run prisma:studio:local`
