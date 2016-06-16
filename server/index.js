var express = require('express');
var bodyParser = require('body-parser')
var app = express();

// parse application/json
app.use(bodyParser.json())

var jsonfile = require('jsonfile');
var file = './db/data.json';

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

var obj = {users: [
	{
		name: 'user1',
		password: 'test1',
		isadmin: false,
		email: 'user1@user1.com',
		id: '259d7acd-ad2c-426e-ae53-4bc57cc51b52'
	},
	{
		name: 'user2',
		password: 'test2',
		isadmin: false,
		email: 'user2@user2.com',
		id: '11d3bd22-cf51-4f22-83d5-51d85223c4d7'
	},
	{
		name: 'admin',
		password: 'a@dm1n',
		isadmin: true,
		email: 'admin@admin.com',
		id: 'a84d3333-a223-48d3-ad27-6aa8c513bd6f'
	}
]}

app.get('/', function(req, res){
	jsonfile.readFile(file, function(err, obj) {
		res.status(200).json({success:'db is running', current: obj});
	});
});

app.get('/resetdb', function(req, res){
	jsonfile.writeFile(file, obj, {spaces: 2}, function(err) {
	  if(err) {
			console.error(err);
			return res.status(400).json({error:err});
		} else {
			console.log('db is flushed');
			res.status(200).json({success:'success', newdb: obj});
		}
	});
});

app.get('/users', function(req, res){
	jsonfile.readFile(file, function(err, obj) {
		if(err) {
			console.error(err);
			return res.status(400).json({error:err});
		} else {
			res.status(200).json(obj);
		}
	})
});

app.post('/adduser', function (req, res) {
	//example: {"user": {"name": "user3","password": "test3","isadmin": false,"email": "user3@user3.com"}}
	if (!req.body) {
		return res.status(400).json({error:'bad request'});
	}
	
	var user = req.body;
	user.user.id = generateUUID();
	console.log('Adding User', user.user);
	jsonfile.readFile(file, function(err, obj) {
		obj.users.push(user.user);
		jsonfile.writeFile(file, obj, function (err) {
			if(err) {
				console.error(err);
				return res.status(400).json({error:err});
			}
			else {
				return res.status(200).json({success:'user added', user: user.user});
			}
		});
	});
});

console.log('server is running at http://localhost:3000');
app.listen(3000);