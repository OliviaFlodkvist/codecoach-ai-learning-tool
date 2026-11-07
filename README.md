# CodeCoach

An AI-powered learning tool built with Next.js, Prisma and the OpenAI API.

![Tests](https://github.com/OliviaFlodkvist/codecoach-ai-learning-tool/actions/workflows/test.yml/badge.svg?branch=main)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed on your machine.

## Docker

### 1. Pull the Postgres Docker Official Image by running the following in your home directory:

```bash
docker pull postgres:14.5
```

### 2. Start a Postgres container by running:

Change 'yourpassword' to something that you want.

```bash
docker run --name codecoach -e POSTGRES_PASSWORD=yourpassword -p 5435:5432 -d postgres:14.5
```

## To access database
Run the following in your database
```bash
npx prisma studio
```
## Testing

Unit tests are written with [Jest](https://jestjs.io/) and run automatically on every push and pull request via GitHub Actions.

```bash
npm test
```

Currently covered: password hashing and verification (`src/lib/password.js`), including valid input, wrong password and malformed input.
