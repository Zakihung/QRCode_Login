class WebSocketClient {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = {};
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      console.log('WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data); // Cố gắng parse dữ liệu
        console.log(message);
        console.log(event.data);
        if (this.listeners[message.type]) {
          this.listeners[message.type].forEach((callback) => callback(message));
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error.message);
        console.log('Received message:', event.data); // Ghi log thông điệp để debug
      }
    };

    this.socket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  sendMessage(message) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open');
    }
  }

  addListener(type, callback) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(callback);
  }

  removeListener(type, callback) {
    if (this.listeners[type]) {
      console.log(type);
      this.listeners[type] = this.listeners[type].filter((cb) => cb !== callback);
    }
  }
}

// const wsClient = new WebSocketClient('ws://10.13.129.148:3000'); //ip của CIT
const wsClient = new WebSocketClient('ws://10.5.5.211:3000');
wsClient.connect();

export default wsClient;
