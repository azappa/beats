/*jshint node:true, eqnull:true, laxcomma:true, undef:true, indent:2, camelcase:false */
'use strict';


var http = require('http')
  , url = require('url')
  , moment = require('moment')
  ;


http.createServer(function (req, res) {
  var url_p = url.parse(req.url, true).query
    , dateUTC = moment.utc()
    , utcHours = dateUTC.hours()
    , utcMinutes = dateUTC.minutes()
    , utcSeconds = dateUTC.seconds()
    , swatchBeats = Math.floor( (((utcHours + 1)%24) + utcMinutes/60 + utcSeconds/3600) * 1000 / 24)
    , objOutput = {
      beats: swatchBeats,
      dateUTC: dateUTC
    }
    ;





  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(objOutput));
}).listen(1337, '127.0.0.1');
