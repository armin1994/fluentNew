---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

fluentai-frontend contains three different platform in a single codebase.
In order to start different platform, you need to run different commands.


## Usage

Clone the repository

```bash
git clone REPO_URL
```

Install dependency

```bash
yarn install
```

## Run

In the development, we are using parceljs to bundle the platform specific code. It is faster than webpack because it uses cache. Before you start your frontend, make sure that backend server is running.

### To start admin panel
```bash
npm run start:admin
```

### To start recording platform
```bash
npm run start:recorder
```

### To start cleaning platform
```bash
npm run start:cleaning
```

### Run Productoin environment using PM2
```bash
npm run start-pm2
```

## Build

It uses webpack to bundle the frontend. It will generate different manifest files containing assets information inside of it. Which will be used in the production environment.

### Clean all builds
It will clean all build by deleting `/build` folder.

```bash
npm run clean
```


### Build all
```bash
npm run buildAll
```


### Build admin
```bash
npm run prod:build-admin
```


### Build recording platform
```bash
npm run prod:build-recorder
```


### Build cleaning platform
```bash
npm run prod:build-cleaning
```
