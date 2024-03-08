**# Vite/Node.js OSC-Websocket Boilerplate**

*Quickly set up OSC (Open Sound Control) communication for your web projects built with Vite.*

**What this project provides:**

* **Simple server implementation:** Uses `node-osc` and `ws` to receive OSC messages and broadcast them via websockets.
* **Vite frontend integration:** WebSocket-ready setup to receive and display OSC data.
* **SuperCollider test script:** Verify everything works with this included script.

**Inspiration and differences:**

This project builds upon the foundation of [osc-web] ([https://github.com/automata/osc-web](https://github.com/automata/osc-web)) by Vilson Vieira, offering a modernized toolkit with Vite and other contemporary tools.

**Getting Started**

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
*  The webpage will display received OSC data in both the console and an on-screen element.

**Let me know if you want adjustments to the title, a specific focus to highlight, or additional features to mention!**

**Key Improvements**

* **Clear Title:** Immediately tells people what the project is about.
* **Concise Overview:**  A few sentences explain the purpose.
* **Bullet Points:** Key features are easy to scan.
* **Code Formatting:**  `bash` blocks make commands readable.


Let me know if you'd like any other modifications. 
