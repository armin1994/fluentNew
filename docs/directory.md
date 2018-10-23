---
id: directory
title: Directory Structure
---

```bash
|-- fluentai-frontend
    |-- .babelrc                 # babel config.
    |-- .gitignore               # ignore files and folders
    |-- README.md
    |-- admin.js                 # entry point
    |-- aliasrc.js               # alias config. for parcel
    |-- index.js                 #  nodejs entry point
    |-- jsconfig.json            # vscode config.
    |-- nodemon.json             # nodemon config.
    |-- package.json
    |-- parcel.config.js         # parceljs config.
    |-- postcss.config.js        # postcss config.
    |-- config                   # environment config.
    |   |-- default.json
    |   |-- production.json
    |-- dist                     # contains all bundles after compilation
    |-- docs                     # documentation
    |-- public                   # public assets
    |   |-- fonts
    |   |-- images
    |   |-- js
    |-- src                      # application folder
    |   |-- client               # client entry points for different users
    |   |-- locale               # multilingual json files
    |   |-- server
    |   |   |-- io               # socket.io files
    |   |-- shared               # shared modules and files
    |   |   |-- modules          # contains all modules
    |   |-- themes
    |   |   |-- index.less       # theme entry point
    |   |-- utils                # utilities
    |-- website                  # docusaurus configuration
    |-- webpack
    |   |-- webpack.prod.js      # webpack for production
    |   |-- utils                # utils to save compiled
    |-- webpack.config.js        # entry point of webpack
```
