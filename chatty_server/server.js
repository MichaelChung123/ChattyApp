const uuid = require('uuid/v1');

// server.js
const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    console.log('Client connected');

    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            if (client.readyState === ws.OPEN) {
                client.send(data);
            }
        });
    };

    // console.log("Total Users: ", wss.clients.size);
    // let totalUsers = JSON.stringify(wss.clients.size);

    // wss.broadcast(totalUsers);

    let totalClients = {
        totalUsers: wss.clients.size,
        type: "refresh"
    };

    wss.broadcast(JSON.stringify(totalClients));    


    ws.on('message', function incoming(data) {
        let parseData = JSON.parse(data);

        console.log("checking for notification:" + data);

        parseData.id = uuid();

        if(parseData.type === "postMessage") {
            parseData.type = "incomingMessage";
        } 
        else if (parseData.type === "postNotification") {
            parseData.type = "incomingNotification";
        }

        let dataString = JSON.stringify(parseData);

        console.log("data:" + dataString);

        wss.broadcast(dataString);
    });


    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        console.log('Client disconnected')
        let totalOpenClients = {
            totalUsers: wss.clients.size,
            type: "refresh"
        };
        
        wss.broadcast(JSON.stringify(totalOpenClients));
    });
});
