import io from 'socket.io-client';

export const socket = io.connect(window.location.origin);

export function webSocketInitiator () {
  console.log('check 1', socket.connected);
  socket.on('connect', function() {
    console.log('check 2', socket.connected);
  });
  
  socket.on('clientTrigger', data => {
    console.log('from Server', data);
    alert('Server Fired');
  });
  
  socket.on('disconnect', function(){
    console.log('disconnected', socket.connected);
  });
}
