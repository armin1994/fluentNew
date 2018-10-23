---
id: locale
title: Locale
---

## JSON to CSV and vice-versa

To generate csv from all locales available inside `/src/locale/` folder. translation.csv will be available from `./tmp` folder.

To convert .json to .csv
```
node i18n.js to-csv [--missing-only]
```
To convert .csv to .json
```
node i18n.js to-json
```

### Options

`--missing-only`   means the generated CSV will only contain keys where there is a missing translation in one of the locales