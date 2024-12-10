

function setupWebSocketServer(server) {
  const WebSocket = require('ws');
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (socket) => {
    console.log('WebSocket client connected');
    socket.send(JSON.stringify({ type: 'welcome', message: 'Connected successfully!' }));
    socket.on('message', (message) => {
      try {
        const parsedMessage = JSON.parse(message);
        console.log('Received message:', parsedMessage);
        if (parsedMessage.type === 'confirm-login') {
          console.log('Received confirm-login event');
          // Phát lại sự kiện confirm-login tới tất cả các client
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'confirm-login' }));
            }
          });
        }
        if (parsedMessage.type === 'cancel-login') {
          console.log('Received cancel-login event');
          // Phát lại sự kiện cancel-login tới tất cả các client
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'cancel-login' }));
            }
          });
        }
      } catch (error) {
        console.error('Received non-JSON message:', message);
      }
    });

    socket.on('close', () => {
      console.log('WebSocket client disconnected');
    });
  });

  wss.sendMessageToAllClients = (message) => {
    const data = JSON.stringify(message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
        console.log("gui thanh cong");
      } else console.log("loi roi");
    });
  };

  return wss;
}

module.exports = setupWebSocketServer;
