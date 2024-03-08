# What is this?

This project is a simple starting point to use OSC messages in javascript based projects built with vite.

The server (`server.cjs`) uses `node-osc` and `ws` to receive OSC messages and forward them to a webpage, locally served with vite/npm, through websockets.

The vite part of the project uses WebSocket to receive the messages as a JSON data and shows the received data in the console and in a div.

The project is based in other older ones such as [https://github.com/automata/osc-web], by Vilson Vieira, but uses new tools.

A simple SuperCollider script is also provided to test the communication process.

## first
install all node modules (node-osc, ws, vite and concurrently):
`npm i`

## run
the command below concurrently runs both the server (`node server.cjs`) and vite (`vite`):
`npm run dev`