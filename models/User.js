var db=require('./db');
var ID = require('mongodb').ObjectID;

User = function (new_user) {
	this._id = new_user._id;
	this.sid = new_user.sid;
	this.name = new_user.name;
	this.passwd = new_user.passwd;
	this.current_location = {};
	this.location_history = [];
	this.friends = [];
	this.states = [];
}

module.exports = User;

User.prototype.dbwork = function(worker, callback) {
	var that = this;
	db.open(function(err,db){
        if(err) {
            db.close();
            callback(err);
        }
        else {
            db.collection('users',function(err,users){
		        if(err) {
		            db.close();
		            callback(err);
		        }else{
		        	worker(that,users,callback);
		        }
            });
        }
    });
};

User.prototype.register = function(that, users, callback) {
	users.find({name: that.name},{safe:true}).toArray(function(err, objs) {
		if(err){		            
			callback(err);return;
		} else if(objs.length > 0){
			callback({type:'err', action: 'register', msg:'this name has been taken'});
		} else{
            users.insert(that,{safe:true},function(err,result){
            	db.close();
            	callback(err,result[0]);
        	});
		}
	});
};

User.prototype.login = function(that, users, callback) {
	users.find({name: that.name, passwd: that.passwd},{safe:true}).toArray(function(err, objs) {
		if(err){		            
			callback(err);
		} else if(objs.length != 1){
			callback({type:'err', action: 'login', msg:'wrong user or passwd'});
		} else{
			var _sid = "s" + parseInt(Math.random()*100000000);
            users.update({_id:objs[0]._id}, {$set:{sid:_sid}},function(err){
            	db.close();
            	objs[0].sid = _sid;
            	callback(err,objs[0]);
        	});
		}
	});
};

User.prototype.logout = function(that, users, callback) {
	console.log({_id: that._id, sid: that.sid});
	users.find({_id: new ID(that._id), sid: that.sid},{safe:true}).toArray(function(err, objs) {
		if(err){		            
			callback(err);
		} else if(objs.length != 1){
			callback({type:'err', action: 'logout', msg:'_id & sid mismatch'});
		} else{
            users.update({_id:objs[0]._id}, {$set:{sid:-1}},function(err,result){
            	db.close();
            	objs[0].sid = -1;
            	callback(err,objs[0]);
        	});
		}
	});
};

User.prototype.getInfo = function(that, users, callback) {
	// body...
};

User.prototype.updateInfo = function(that, users, callback) {
	// body...
};

User.prototype.locations = function(that, users, callback) {
	// body...
};

User.prototype.getLocation = function(that, users, callback) {
	// body...
};

User.prototype.getNearBy = function(that, users, callback) {
	// body...
};

User.prototype.resetPasswd = function(that, users, callback) {
	// body...
};

User.prototype.addFriend = function(that, users, callback) {
	// body...
};

User.prototype.deleteFriend = function(that, users, callback) {
	// body...
};

User.prototype.getFriendsList = function(that, users, callback) {
	// body...
};

User.prototype.postState = function(that, users, callback) {
	// body...
};

User.prototype.getStatesList = function(that, users, callback) {
	// body...
};