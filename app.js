/*jshint node:true, eqnull:true, laxcomma:true, undef:true, indent:2, camelcase:false */
'use strict';


var http = require('http')
  , url = require('url')
  , moment = require('moment')
  ;


http.createServer(function (req, res) {

  var datetimePassed = url.parse(req.url, true).query.datetime || new Date()
    , datetime = moment(datetimePassed)
    , dateUTC = datetime.utc()
    , swatchBeats = Math.round((((dateUTC.hours() + 1) % 24) + dateUTC.minutes() / 60 + dateUTC.seconds() / 3600) * 1000 / 24)
    , objOutput = {
      beats: swatchBeats,
      dateUTC: dateUTC,
      datePassedOrNot: url.parse(req.url, true).query.datetime ? 'passed' : 'not passed',
      dateOriginal: datetimePassed
    }
    ;


  res.writeHead(200, {
    'Content-Type': 'application/json',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET',
    'access-control-allow-headers': 'content-type, accept'
  });
  
  res.end(JSON.stringify(objOutput));


}).listen(1337, '127.0.0.1');
