'use strict';

var engine = require('engine.io'),
    path = require('path'),
    Q = require('q'),

    server = engine.listen(8088),

    sockets = [],

    timelineData,

    lastTime = 0;

function loadTimelineData() {
    var filePath = path.join(__dirname, '../data/planets.json'),
        deferred = Q.defer();

    fs.readFile(filePath, function(err, data) {
        deferred.resolve(JSON.parse(data));
    });

    return deferred.promise;
}

function findTimelineActivityFromTime(time) {
    var theTime = Math.floor(time),
        result = null;

    timelineData.forEach(function(data) {
        if (data.time === theTime) {
            result = data;
        }
    });

    return result;
}

function broadcast(time) {
    console.log('broadcast');
    var meta = findTimelineActivityFromTime(time);

	if (lastTime > time) {
		timelineData.forEach(function(data) {
			data.sent = false;
		});
	}

    if (!meta || meta.sent) {return;}

    sockets.forEach(function(socket) {
        socket.send(JSON.stringify(meta));
    });

    meta.sent = true;

    lastTime = time;
}

function handleMessage(data) {
    //console.log('message');
    //console.log(data);

	var parsed, payload, time;

	try {
		parsed = JSON.parse(data);
	} catch (ignore) {}

	if (!parsed) {return;}

	payload = parsed.payload;

    broadcast(parseFloat(payload.time));
}

function listen(socket) {
    console.log('connected');
	sockets.push(socket);

	socket.on('message', handleMessage);
}

function initializeServer(data) {
    timelineData = data;

    server.on('connection', listen);

    console.log('Server is listening on port 8088.');
}

loadTimelineData().then(initializeServer);
