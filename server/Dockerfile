# TODO: To be used for compiling into single file using the `pkg` node module
FROM node:21.1.0-bullseye-slim

WORKDIR /app

RUN npm i pkg@5.8.1 -g

# TODO: Run this in compose file? pkg --targets node14-linux,node14-windows main.js 