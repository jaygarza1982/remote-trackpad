const WebSocket = require('ws');
const http = require('http');
const indexFile = require('./res/index.html').file;

const PORT = 3000;

// Create an HTTP server to serve HTML, if needed
const server = http.createServer((req, res) => {
    console.log(`Received ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexFile);
});

// Create a WebSocket server by passing the HTTP server instance
const wss = new WebSocket.Server({ server });

// WebSocket event handling
wss.on('connection', (ws) => {
    console.log('A new client connected');

    // Listen for messages from clients
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
    });

    // Send a welcome message to the connected client
    ws.send('Welcome to the WebSocket server!');
});

// Start the HTTP server on port PORT
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
