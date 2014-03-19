var db=require('./db');
var ObjectID = require('mongodb').ObjectID;
db.open(function(err,db){
	db.collection('users',function(err,users){
	users.find({_id: new ObjectID("53132fbdd084d08e3f3b66b7"), sid: 77779023},{safe:true}).toArray(function(err, objs) {
		if(err){		            
			console.log("err");
		} else if(objs.length != 1){
			console.log({type:'err', action: 'logout', msg:'_id & sid mismatch'});
		} else{

		}
	});
	});
});

