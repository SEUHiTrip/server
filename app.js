
/**
 * Module dependencies.
 */

var express = require('express')
  , handlers = require('./handlers');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.methodOverride());
  app.use(express.bodyParser({ keepExtensions:true, uploadDir: __dirname + '/upload/files' }));
  app.use(express.cookieParser());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('*', handlers.common);
app.get('/i*', handlers.i);
app.get('/', handlers.index);

app.get('/hello', handlers.hello);
app.post('/hello', handlers.hello);

app.get('/recommend/:num?', handlers.recommend);

app.post('/register', handlers.register);

app.post('/login', handlers.login);
app.post('/logout', handlers.logout);

app.post('/i/locations/update', handlers.locations.update);
app.post('/i/locations/list/:num', handlers.locations.list);

app.post('/i/friends/add', handlers.friends.add);
app.post('/i/friends/del', handlers.friends.del);
app.post('/i/friends/find', handlers.friends.find);
app.post('/i/friends/list/:num?', handlers.friends.find);

app.post('/i/states/post/text', handlers.post.text);
app.post('/i/states/post/pic', handlers.post.pic);
app.post('/i/states/post/list/:num', handlers.post.list);

app.get('/i/newsfeed/:num?', handlers.newsfeed);

app.post('/i/settings/update_passwd', handlers.settings.update_passwd);

app.post('/i/notifications/list', handlers.notifications.list);
app.post('/i/notifications/clear', handlers.notifications.clear);
app.post('/i/notifications/reply', handlers.notifications.reply);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
