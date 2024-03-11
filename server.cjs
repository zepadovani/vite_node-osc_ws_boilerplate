const osc = require('node-osc');
const WebSocket = require('ws');

// Create OSC server
const oscServer = new osc.Server(3333, '127.0.0.1');
const oscClient = new osc.Client('127.0.0.1',4444);

// Store for tracking socket IDs
const socketIdsByAddress = {};

console.log('OSC bridge is running on port 3333');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 3000 });  
const wss2 = new WebSocket.Server({ port: 3001 });

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
        console.log('message received:', message)
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




// Listen for new WebSocket connections
wss2.on('connection', (socket) => {
    // console.log('New socket connected');
    // Generate a unique ID for the socket
    // socket.id = Math.random().toString(36).substr(2, 9);

    // // Store the address of the socket
    // socket.address = socket._socket.remoteAddress;
    // socketIdsByAddress[socket.address] = socket.id;

    // Log the new connection
    console.log(`New socket connected (wss2, receuving)!`);

    // Listen for messages from the socket
    socket.on('message', (message) => {
        console.log('message received (wss2, receiving):', JSON.parse(message));
        try {
            const { address, args } = JSON.parse(message);
            // Create an OSC message with the socket's address and arguments
            const msg = new osc.Message(address, ...args);
            console.log(`Sending back OSC message: ${msg} from ${socket.address} to ${oscServer.address} ${oscServer.port}`);
            // Send the OSC message to the OSC server
            oscClient.send(address, ...args);
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    // Remove the socket ID when the socket is closed
    socket.on('close', () => {
        delete socketIdsByAddress[socket.address];
        console.log(`wss2 Socket disconnected: ${socket.address}`);
    });
});



// Function to send OSC messages to the frontend
function sendOSCToFrontend(address, args) {
  // Find a connected WebSocket client (you'll likely need more sophisticated logic for multiple clients)
  const client = Array.from(wss.clients).find(client => client.readyState === WebSocket.OPEN);

  if (client) {
    client.send(JSON.stringify({ address, args }));
  } else {
    console.error('No connected WebSocket clients found.');
  }
}

// Example usage (inside a suitable place in your server logic):
sendOSCToFrontend('/feedback', [1, 2, 3]); 