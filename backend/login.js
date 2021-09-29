var http = require('http');
var url = require('url');
var util = require('util');
const f = require('./function');
const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://Admin:0Sse2PXmvz5Po0Ae@being-seen.h8tpx.mongodb.net/user";
const client = new MongoClient(uri, {useUnifiedTopology: true});
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    var params = url.parse(req.url, true).query;

	var user = {name: params.name, password: params.password};
	localtime = new Date().getTime();
	localToken = f.md5(user+localtime);

	async function run() {
	  try {
	    await client.connect();

	    const database = client.db("user");
	    const users = database.collection("users");

	    const filter = user;

	    const updateDoc = {
	      $set: {
	        token: localToken, time: localtime
	      },
	    };

	    const result = await users.updateOne(filter, updateDoc);

	    if (result.modifiedCount = 1) {
	    	res.write(localToken);
	    	res.end();
	    }
	  } finally {
	    // await client.close();
	  }
	}
	run().catch(console.dir);

}).listen(3000);