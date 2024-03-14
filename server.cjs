const osc = require('node-osc');
const WebSocket = require('ws');

// Create OSC server (internal... only websocket IP needs to be exposed to the network. see main.js for client connection.)
const oscServer = new osc.Server(3333, '127.0.0.1');
const oscClient = new osc.Client('127.0.0.1', 4444);

// Array to store connected WebSocket clients
const connectedClients = [];

console.log('OSC bridge is running on port 3333');

// Create WebSocket servers
const wss = new WebSocket.Server({ port: 3000 });
const wss2 = new WebSocket.Server({ port: 3001 });

// Listen for incoming OSC messages
oscServer.on('message', (msg) => {
    // Extract the address and arguments from the OSC message
    const [address, ...args] = msg;
    console.log(`Received OSC message: ${address} ${args}`);

    // Forward OSC message to all connected WebSocket clients
    connectedClients.forEach((socket) => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ address, args }));
        } else { 
            // Optional: Remove closed sockets from connectedClients
            connectedClients.splice(connectedClients.indexOf(socket), 1);
        }
    });
});

// Listen for new WebSocket connections (wss)
wss.on('connection', (socket) => {
    // Add connected client to array
    connectedClients.push(socket);

    console.log(`New socket connected!`);

    // Listen for messages from the socket
    socket.on('message', (message) => {
        console.log('message received (forwarding):', message)
        try {
            const { address, args } = JSON.parse(message);

            // Send the OSC message to the OSC client
            oscClient.send(address, ...args);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    // Remove the client when the socket is closed
    socket.on('close', () => {
        connectedClients.splice(connectedClients.indexOf(socket), 1);
        console.log(`Socket disconnected`);
    });
});

// Listen for new WebSocket connections (wss2, receiving)
wss2.on('connection', (socket) => {
    // Add connected client to array
    connectedClients.push(socket);

    console.log(`New socket connected (wss2, receiving)!`);

    // Listen for messages from the socket
    socket.on('message', (message) => {
        console.log('message received (wss2, receiving):', JSON.parse(message));
        try {
            const { address, args } = JSON.parse(message);

            // Send the OSC message to the OSC client
            oscClient.send(address, ...args);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    // Remove the client when the socket is closed
    socket.on('close', () => {
        connectedClients.splice(connectedClients.indexOf(socket), 1);
        console.log(`wss2 Socket disconnected`);
    });
});
