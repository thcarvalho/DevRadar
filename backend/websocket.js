const socketio = require('socket.io');
const StringToArray = require('./src/utils/StringToArray')
const calculateDistance = require('./src/utils/calculateDistance')
const connections = [];

let io;

exports.setupWebSocket = (server) => {
  io = socketio(server);
  io.on('connection', socket => {
    console.log(socket.id);
    const {latitude, longitude, techs} = socket.handshake.query
    connections.push({
      id: socket.id,
      coords: {
        latitude: Number(latitude),
        longitude: Number(longitude),
      },
      techs: StringToArray(techs),
    })
  })
}

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return calculateDistance(coordinates, connection.coords) < 10 && connection.techs.some(tech => techs.includes(tech));
  });
}

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  })
}