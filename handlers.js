var User = require('./models/User');
var Location = require('./models/Location');
exports.common = function(req, res , next){
  next();
};

exports.i = function(req, res, next){
  var cookies = req.cookies;
  if( cookies.sid && cookies._id ){
    res.send({type: 'err', action: 'i', msg: 'please login first'});
  } else {
    next();
  }
};

exports.index = function(req, res){
  res.render('index', { title: 'HiTrip Server' })
};

exports.hello = function(req, res){
  var query = req.query;
  var body = req.body;
  var params = req.params;
  var files = req.files;
  var cookies = req.cookies;
  res.send({ 'query': query, 'body': body, 'files': files , 'cookies': cookies });
};

exports.recommend = function(req, res){
  res.send('recommend')
};


exports.register = function(req, res){
  var _name = req.body.name;
  var _passwd = req.body.passwd;

  if(!_name || !_passwd){
    res.send({type:'err', action: 'register', msg:'should have name and passwd'});
    return;
  }

  var u = new User({ name: _name, passwd: _passwd });

  u.dbwork(u.register , function(err , user) {
    if(err)
      res.send(err);
    else
      res.send({type: 'ok', action: 'register', u: user});
  });

};

exports.login = function(req, res){
  var _name = req.body.name;
  var _passwd = req.body.passwd;
  var _sid = req.cookies.sid;

  var cookies = req.cookies;

  if( cookies.sid && cookies._id ){
    res.send({type: 'err', action: 'login', msg: 'you have already logged in, please logout first'});
    return;
  }

  var u = new User({ name: _name, passwd: _passwd });

  u.dbwork(u.login , function(err , user) {
    if(err) res.send(err);
    else{
        res.cookie('sid', user.sid , { path: "/" });
        res.cookie('_id', user._id , { path: "/" });
        res.send({type: 'ok', action: 'login', u: user});
    }
  });

};

exports.logout = function(req, res){
  var _id = req.cookies._id;
  var _sid = req.cookies.sid;

  if( !(req.cookies.sid && req.cookies._id) ){
    res.send({type: 'err', action: 'logout', msg: 'you have already logged out, please login first'});
    return;
  }
  var u = new User(req.cookies);//{ _id: _id, sid: _sid }

  u.dbwork(u.logout , function(err) {
    if(err) res.send(err);
    else{
        res.clearCookie('sid', { path: "/" });
        res.clearCookie('_id', { path: "/" });
        res.send({ type: 'ok', action: 'logout' });
    }
  });
};

exports.locations = {
  update:function (req, res) {
    var location = new Location(
        req.body.latitude,
        req.body.latitude,
        req.body.scenic_id,
        req.body.timestamp
    );
    if(!location.isValid()){
      res.send({type: 'err', action: 'locations', msg: 'invalid location'});
    } else {
      var u = new User(req.cookies);
        u.dbwork(u.locations.update , function(err) {
          if(err) res.send(err);
          else{
              res.clearCookie('sid', { path: "/" });
              res.clearCookie('_id', { path: "/" });
              res.send({ type: 'ok', action: 'logout' });
          }
        });
    }
  },
  list:function (req, res) {
    // body...
  }
};

exports.states = function(req, res){
  res.send('states')
};

exports.friends = function(req, res){
  res.send('friends')
};

exports.settings = function(req, res){

};

exports.notifications = function(req, res){
  res.send('notifications')
};

exports.intends = function(req, res){
  res.send('intends')
};

var locationManager