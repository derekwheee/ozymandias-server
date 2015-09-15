var socket = require('socket.io');

function Dispatch(http) {

    var io = socket(http);

    io.on('connection', function(socket){
        connect();

        socket.on('johnny', johnny);
        socket.on('disconnect', disconnect);
    });

}

function connect() {
    console.log('connect');
}

function johnny(data) {
    console.log(data);
}

function disconnect() {
    console.log('disconnect');
}

module.exports = Dispatch;
