# Vite/Node.js OSC-Websocket Boilerplate

Quickly set up OSC (Open Sound Control) communication for your web projects built with Vite.

## What this project provides:

**Simple server implementation:** 

Uses `node-osc` and `ws` to receive OSC messages and broadcast them via websockets.

**Vite frontend integration:** 

WebSocket-ready setup to receive and display OSC data.

**SuperCollider test script:** 
Verify everything works with this included script.

**Inspiration and differences:**

This project builds upon the foundation of [osc-web] ([https://github.com/automata/osc-web](https://github.com/automata/osc-web)) by Vilson Vieira, offering a modernized toolkit with Vite and other contemporary tools (WebSocket and `ws` instead of `socket.io`)

## Getting Started

1. **Installation:**
   ```bash
   npm i 
   ```
2. **Run:**
   ```bash
   npm run dev 
   ```

**Notes:**
*  The server listens for OSC and websocket connections. To configure ports and addresses, adjust settings in `server.cjs`. 
*  The OSC port and the websocketport are not the same thing (the OSC one is the connection between the server and an external app, such as SC; the WebSocket one is used only to communicate between the node server and the vite-based client).
*  The webpage will display received OSC data in both the console and an on-screen div element.
