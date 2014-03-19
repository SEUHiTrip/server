var settings = require('./settings');
var Db = require('mongodb').Db;
var BSON = require('mongodb').BSONPure;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;

module.exports = new Db(settings.dbname, new Server(settings.host, settings.port, {auto_reconnect:true}),{safe:true});
