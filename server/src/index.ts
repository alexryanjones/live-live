import http from 'http';
import dgram from 'dgram';
import WebSocket, { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const port = 8001;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);
});

const udpServer = dgram.createSocket('udp4');

udpServer.on('listening', () => {
  const address = udpServer.address();
  console.log(`UDP server listening ${address.address}:${address.port}`);
});

udpServer.on('message', (msg, rinfo) => {
  const pitch = msg.readUInt32BE(16);
  const velocity = msg.readUInt32BE(20);
  const track = msg.readUInt32BE(24);
  console.log(
    `Received ${pitch} ${velocity} ${track} from ${rinfo.address}:${rinfo.port}`
  );
  const message = JSON.stringify({ pitch, velocity, track });
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
});

udpServer.bind(8000);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
