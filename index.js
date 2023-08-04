import http from 'http';
import dgram from 'dgram';
import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 8001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    console.log('received: %s', data);
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send({data: 'fuck'});
      }
    });
  });
});

const udpServer = dgram.createSocket('udp4');

udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`UDP server listening ${address.address}:${address.port}`);
});

udpServer.on('message', (msg, rinfo) => {
  console.log(msg);
  const buffer = JSON.stringify([...msg]);
  console.log(buffer);
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(buffer);
    }
  });
});

udpServer.bind(8000);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
