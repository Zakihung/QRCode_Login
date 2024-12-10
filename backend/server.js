const app = require("./app");
const config = require("./app/config");
const mongoose = require("mongoose");
const http = require("http");
const setupWebSocketServer = require('./WebSocketServer');

async function startServer() {
	try {
		await mongoose.connect(config.db.uri);
    	console.log("Connected to the database!");

		const PORT = config.app.port;
		const server = http.createServer(app);
		const host = "10.5.5.211"
		// const host = "192.168.121.82"
		// const host = "10.13.129.148" //ip của CIT

		const wsServer = setupWebSocketServer(server);
		app.set('wsServer', wsServer);
		console.log("Ket noi server WebSocket thanh cong");

		server.listen(PORT, host, () => {
			console.log(`HTTP server is listening on ${host}:${PORT}`);
		});
		
		

    } catch (error) {
		console.log("Cannot connect to the database!", error);
		process.exit();
	}
}

startServer();
    