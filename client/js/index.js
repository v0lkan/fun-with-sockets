(function(window, document) {
    'use strict';

    var socket = new eio.Socket('ws://localhost:8088/'),

        scene = document.getElementById('Scene');

    scene.style.height = document.documentElement.clientHeight + 'px';
    scene.style.width = document.documentElement.offsetWidth + 'px';



    socket.on('open', function() {
        socket.on('message', function(data) {
            console.log('message');
            console.log(data);

            document.getElementById('Scene').src = JSON.parse(data).url;
        });
    });
}(this, this.document));

