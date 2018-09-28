module.exports = function (io) {
    var users = {};
    var messages = [];
    io.on('connection', function(socket){
        //Create user by socket
        if(!users.hasOwnProperty(socket.id)) {
            users[socket.id] = {};
        }
        socket.emit('new-connection', { 
        id: socket.id, 
        messages: messages
        });
        
        socket.on('chat-message', function(msgObjt){
            console.log(`message received on backend: ${msgObjt}`);
            messages.push(msgObjt);
            io.emit('chat-message', msgObjt);
            console.log(`Esto es lo que queremos ver ${messages[0].user}`);
        });
    });
};
