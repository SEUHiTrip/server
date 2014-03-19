module.exports = function (latitude, longitude, scenic_id, timestamp) {
	this.latitude = latitude;
	this.longitude = longitude;
	this.scenic_id = scenic_id;
	this.timestamp = timestamp;
}

exports.prototype.isValid = function() {
	return latitude && longitude && timestamp;
}
