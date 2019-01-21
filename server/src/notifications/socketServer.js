let connectedClients=1;

function prepareSockets(socketio){
  socketio.on('connection', (sockServer) => {
    console.log('User connected', connectedClients);
    connectedClients++;

    sockServer.on('connect', function () {
      userConnections--;
      console.log('connect Event');
    });

    sockServer.on('disconnect', function () {
      connectedClients--;
      console.log('user disconnected current count - ', connectedClients);
    });



//  CustomSocketEventListeners
    sockServer.on('serverTrigger', data => {
      console.log('fromClient', data);
//      socketio.sockets.emit('clientTrigger', 'Broadcast to all users');
      sockServer.broadcast.emit('clientTrigger', 'Broadcast to users other than the triggered one');
    });
  });



  // ToDo: Individual chat-rooms {redis; user-realtime-notifications}
  const negotiationSock = socketio.of('/negotiationRoom');
  negotiationSock.on('connection', negotiationServer => {

  });




}

module.exports = prepareSockets;