---
id: configuration
title: Configuration
---

Configuration for different environments can be found inside `/config` folder. Configuration options will be changed according to your environments.

## Options

- `home` Home url
- `env` set of different development and production environments.
   - `dev` set of known development environments.
   - `prod` set of known production environments.
- `hmr` hmr configuration for hot reloading in development using parceljs.
- `server` sever configuration.
- `socketServer` streaming server url used for wakeword.
- `jsonServer` RPC server url to connect to backend.
- `redis` redis server config. for session storage.
