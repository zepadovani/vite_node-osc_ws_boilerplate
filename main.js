// Create a new WebSocket connection
const socket = new WebSocket('ws://localhost:3000');

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
  
  console.log('Address:', address);
  console.log('Ards:', args);
  
  // Update the "messages" div with the received data
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = `<p>address: ${address} || args: ${JSON.stringify(args)}</p>`;
});

// Event listener for when the connection is closed
socket.addEventListener('close', () => {
  console.log('Disconnected from the server');
});