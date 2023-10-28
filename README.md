# worksheets.dev

## getting started

### Running the project locally.

Before attempting to run the project, prepare your .env.local configuration.

1. Start the docker engine.
2. Start the postgres local server. `npm run docker:compose:up`
3. If this is your first time running the project, you will need to push prisma changes `npm run prisma:generate:local && npm run prisma:push:local`
4. Start applications. `npm run serve`
5. Optionally: start prisma studio to observe database changes. `npm run prisma:studio:local`

### project dependencies

### preparing the project

from the root of the repository run:

```bash
npm i
```

## generating resources

```bash
npx nx g @nx/react:component <name> --project=common-ui --export
npx nx g @nrwl/workspace:move --project oldNG newNG
npx nx g @nx/js:lib apps/sys
nx g @simondotm/nx-firebase:app <appname> [--directory=dir] [--project=proj]
```

## moving projects

```bash
nx g mv --project games-scramble-jam games/puzzle-words
```
