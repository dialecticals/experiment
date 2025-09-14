#!/bin/bash

rm package.json package-lock.json tsconfig.json
rm -rf node_modules

# Updating global npm
npm -g install npm@latest

# Project settings
npm init
npm install npm@latest
npm install typescript
npm install graphology graphology-components graphology-layout-forceatlas2 graphology-layout \
    papaparse sigma @types/node

npx tsc --init

npm ls --omit=dev
