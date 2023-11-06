const WebSocket = require('ws');
const http = require('http');

// Create an HTTP server to serve HTML, if needed
const server = http.createServer((req, res) => {
    console.log(`Received ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>WebSocket Server</h1>');
});

// Create a WebSocket server by passing the HTTP server instance
const wss = new WebSocket.Server({ server });

// WebSocket event handling
wss.on('connection', (ws) => {
    console.log('A new client connected');

    // Listen for messages from clients
    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        // Broadcast the message to all connected clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Send a welcome message to the connected client
    ws.send('Welcome to the WebSocket server!');
});

// Start the HTTP server on port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
