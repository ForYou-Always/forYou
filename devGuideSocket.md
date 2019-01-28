# forYou


#### Socket Front-end:


*Define Socket Events in socketClient:*
                
    folder dir 'front/src/common/notifications/socketClient';
        
    Ex:socket.on('reverseAjaxCall', data => {
         console.log('Call from Server without any client request', data);
         alert('Call from Server');
      });
      
    Define your functions that need to be performed when a particular event happens 
    in server side.
    i.e fetch latest records from server & re-render the notification component
    
    Ex: when a friend update new profile pic, you will get notified without any request from your side.
    
    
#### Socket Back-end:
    
*Define Socket Events in server:*
       
    folder dir "server\src\notifications\socketServer.js";
    
    similar to the one you have performed in client-side.
    Perform the same way of implementations if needed.

    
#### Emit socket events:

       Whenever you need to perform reverse ajax in a particular operation from
       server side you need to emit the socket-events which is defined in your client.
       
       Ex1: socket.emit('reverseAjaxCall', 'Sent an event from the server!')}
       Ex2: sockServer.broadcast.emit('clientTrigger', 'Broadcast to users other than the triggered one');
       Ex3: socketio.sockets.emit('clientTrigger', 'Broadcast to all users');
