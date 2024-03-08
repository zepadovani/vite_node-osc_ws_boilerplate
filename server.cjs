const osc = require('node-osc');
const WebSocket = require('ws');

// Create OSC server
const oscServer = new osc.Server(3333, '127.0.0.1');
// Store for tracking socket IDs
const socketIdsByAddress = {};

console.log('OSC bridge is running on port 3333');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3000 });

// Listen for incoming OSC messages
oscServer.on('message', (msg) => {
    // Extract the address and arguments from the OSC message
    const [address, ...args] = msg;
    // console.log(`Received OSC message: ${address} ${args}`);

    const socketId = socketIdsByAddress[address];
    const socket = Array.from(wss.clients).find((client) => client.id === socketId);

    // If a socket is found, send the OSC message to it
    if (socket) {
        socket.send(JSON.stringify({ address, args }));
    }
});

// Listen for new WebSocket connections
wss.on('connection', (socket) => {
    // console.log('New socket connected');
    // Generate a unique ID for the socket
    // socket.id = Math.random().toString(36).substr(2, 9);

    // // Store the address of the socket
    // socket.address = socket._socket.remoteAddress;
    // socketIdsByAddress[socket.address] = socket.id;

    // Log the new connection
    console.log(`New socket connected!`);

    // Listen for messages from the socket
    socket.on('message', (message) => {
        try {
            const { address, args } = JSON.parse(message);
            // Create an OSC message with the socket's address and arguments
            const msg = new osc.Message(address, ...args);
            console.log(`Sending OSC message: ${msg} from ${socket.address} to ${oscServer.address} ${oscServer.port}`);
            // Send the OSC message to the OSC server
            oscServer.send(msg);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    // Remove the socket ID when the socket is closed
    socket.on('close', () => {
        delete socketIdsByAddress[socket.address];
        console.log(`Socket disconnected: ${socket.address}`);
    });
});