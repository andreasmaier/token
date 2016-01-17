console.log('connecting');

var socket = io.connect('http://localhost:4004');

socket.on('onconnected', function (data) {
    console.log('Connected successfully to the socket.io server. My server side ID is ' + data.id);
});

//var socket = io.connect('http://localhost:4004');
//socket.on('news', function (data) {
//    console.log(data);
//    socket.emit('my other event', { my: 'data' });
//});