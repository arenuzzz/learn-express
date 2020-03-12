const EventEmitter = require("events").EventEmitter;

var server = new EventEmitter();

server.on("request", request => {
  request.approved = true;
});

server.on("request", request => {
  console.log(request);
});

server.emit("request", { from: "kek" });
server.emit("request", { from: "lol" });
