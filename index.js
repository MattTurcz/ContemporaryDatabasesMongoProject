$(document).ready(function() {
	databaseInit()
}

function databaseInit() {
	connection = new Mongo('localhost:27017');
	db = connection.getDB('MovieDatabase');
	collection = db.getCollection('titleBasics');
}