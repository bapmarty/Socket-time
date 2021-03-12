const express = require("express");
const http = require("http");
const port = process.env.SERVER_PORT || 5001;
const index = require("./routes/index");

const app = express();
app.use(index);

app.use((req, res, next) => {
	const origin = req.get('Access-Control-Allow-Origin');

	// TODO Add origin validation
	res.header('Access-Control-Allow-Origin', origin);
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

	// intercept OPTIONS method
	if (req.method === 'OPTIONS') {
		res.sendStatus(204);
	} else {
		next();
	}
});

const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
	transports: ['websocket', 'polling', 'flashsocket']
});

let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = socket => {
	const response = new Date();
	// Emitting a new message. Will be consumed by the client
	socket.emit("FromAPI", response);
};


httpServer.listen(port, () => console.log(`Listening on port ${port}`));