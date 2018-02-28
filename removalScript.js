connection = new Mongo('localhost:27017');
db = connection.getDB('MovieDatabase');
collection = db.getCollection('titleBasics');

var cursor = db.titleBasics.aggregate([{$lookup:{from: “titleAKA”, localField: “tconst”, foreignField: “titleId”, as: “removalAKA”}},{$unwind: "$removalAKA"},{$lookup:{from: “titleRatings”, localField: “tconst”, foreignField: “tconst”, as: “removalRatings”}},{$unwind: "$removalRatings"},{$match:{titleType:{$ne: "movie"}}}])

var dataId = cursor.map(function (titleBasics) { return titleBasics.tconst; });
db.titleAKA.remove({"titleId": {"$in": dataId }});
db.titleRatings.remove({"tconst:" {"$in": dataId}});
db.titleBasics.remove({"tconst": {"$in": dataId}});