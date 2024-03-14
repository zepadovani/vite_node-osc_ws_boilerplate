
// Create a new WebSocket connection
const serverIP = '127.0.0.1' //change to your machine's IP address to enable LAN communication

const socket = new WebSocket('ws://' + serverIP + ':3000');
const socketSend = new WebSocket('ws://' + serverIP + ':3001');


// Event listener for when the connection is established
socket.addEventListener('open', () => {
  console.log('Connected to the server');
});

// Event listener for incoming messages
socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Message received:', data);
  
  // Access the values of "address" and "ards" keys
  const address = data.address;
  const args = data.args;
  
  console.log('address:', address,'| args:', args);
  
  // Update the "messages" div with the received data
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = `<p>${address}    ${JSON.stringify(args)}</p>`;
});

// Event listener for when the connection is closed
socket.addEventListener('close', () => {
  console.log('Disconnected from the server');
});

// Function to send OSC messages to the server
function sendOSCMessage(address, args) {
  if (socketSend.readyState === WebSocket.OPEN) {
    socketSend.send(JSON.stringify({ address, args }));
    console.error(`${address} and ${args} sent to socket`); 
  } else {
    console.error('WebSocket not ready. Message not sent.'); 
  }
}

// // Example usage:
// setInterval(() => {
  
// }, 1000);


// Event listener for when the connection is closed
socketSend.addEventListener('close', () => {
  console.log('Disconnected from the server (socketSend)');
});


// const button = document.getElementById('sendButton');

// // Add an event listener for the 'click' event
// button.addEventListener('click', sendOSCMessage('/someAddress', [123, 'hello'])); 