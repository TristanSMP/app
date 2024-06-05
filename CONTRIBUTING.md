# Contributing

Before contributing please review our [code of conduct](https://github.com/TristanSMP/gateway/blob/main/CODE_OF_CONDUCT.md).

## Setting up a dev environment

### Prerequisites

- Node 16+
- Yarn classic (v1)
- MySQL database
- JDK/Java 17
- Discord dev OAuth app

If you need to modify wings, you should download it [here](https://github.com/TristanSMP/wings/releases).  
If there's nothing there, you can download the dev version from [here](https://cdn.tristancamejo.com/tsmp/wings-all.jar).

### Clone the Git repo

```sh
git clone https://github.com/TristanSMP/gateway.git
```

### Environment variables

Fill in your environment variables according to the [`.env.example`](https://github.com/TristanSMP/gateway/blob/main/.env.example).

The `ELYTRA_API_ROOT` environment variable should **not** including a trailing slash.

### Installing dependencies

Make sure you're in the project root, and run:

```sh
yarn
```

### Running the Next.js app

If you haven't already, this is the time to start your MySQL server.
Create a MySQL database user called "tsmp" and grant it all permissions.

```sh
# Push prisma schema to database
# Only needed when schema.prisma is updated or in a new database
yarn prisma db push

yarn dev
```

If everything goes smoothly, you should see the homepage at http://localhost:3000.
Don't worry if you got some errors as you have not configured Wings or the Discord app yet.

If you get a build-time error on the homepage or unable to get it working,
you can visit the #developing-tsmp channel in our [Discord server](https://tristansmp.com/discord).

### Running Wings

WIP

### Configuring Discord app

WIP
