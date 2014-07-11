(function(window, document) {
    'use strict';

    var socket = new eio.Socket('ws://localhost:8088/');

    socket.on('open', function() {
        socket.on('close', function() {
            console.log('closed');
        });

        var video = document.getElementsByTagName('video')[0];

        video.addEventListener('timeupdate', function(event) {
            socket.send(JSON.stringify({
                action: 'time',
                payload: {time: video.currentTime}
            }));
        }, false);

        video.play();
    });
}(this, this.document));
