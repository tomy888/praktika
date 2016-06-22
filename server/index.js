var express = require('express');
var bodyParser = require('body-parser');
var app = express();

/**
 * Enables CORS
 */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
 * parse application/json
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * PARAMS
 */
var jsonfile = require('jsonfile');
var file = './db/data.json';

/**
 * Generates UUID
 * @returns {string}
 */
function generateUUID() {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function deleteUser (id) {
    refreshDb();
    console.log('deleting user: ' + id);
    var index = -1;
    for (var i = 0; i < obj.users.length; i++) {
        if (obj.users[i].id == id) {
            index = i;
        }
    }
    if (index < 0) {
        return false;
    } else {
        obj.users.splice(index, 1);
        jsonfile.writeFile(file, obj, {spaces: 2}, function (err) {
            console.error(err);
        });
        return true;
    }
};

function updateUser (id, user) {
    refreshDb();
    console.log('updating user: ' + user);
    var index = -1;
    for (var i = 0; i < obj.users.length; i++) {
        if (obj.users[i].id == id) {
            index = i;
        }
    }
    if (index < 0) {
        return false;
    } else {
        obj.users[index] = user;
        jsonfile.writeFile(file, obj, {spaces: 2}, function (err) {
            console.error(err);
        });
        return true;
    }
};

function refreshDb() {
    jsonfile.readFile(file, function (err, newobj) {
        obj = newobj;
    });
}

var obj = {
    users: [
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
    ]
}; var obj_tmp = obj;

app.get('/', function (req, res) {
    jsonfile.readFile(file, function (err, obj) {
        res.status(200).json({success: 'db is running', current: obj});
    });
});

app.get('/resetdb', function (req, res) {
    jsonfile.writeFile(file, obj_tmp, {spaces: 2}, function (err) {
        if (err) {
            console.error(err);
            return res.status(400).json({error: err});
        } else {
            console.log('db is flushed');
            res.status(200).json({success: 'success', newdb: obj});
        }
    });
});

app.get('/users', function (req, res) {
    jsonfile.readFile(file, function (err, obj) {
        if (err) {
            console.error(err);
            return res.status(400).json({error: err});
        } else {
            res.status(200).json(obj);
        }
    })
});

app.post('/adduser', function (req, res) {
    //example: {"user": {"name": "user3","password": "test3","isadmin": false,"email": "user3@user3.com"}}
    if (!req.body) {
        return res.status(400).json({error: 'bad request'});
    }

    var user = req.body;
    user.user.id = generateUUID();
    console.log('Adding User', user.user);
    jsonfile.readFile(file, function (err, obj) {
        obj.users.push(user.user);
        jsonfile.writeFile(file, obj, function (err) {
            if (err) {
                console.error(err);
                return res.status(400).json({error: err});
            }
            else {
                return res.status(200).json({success: 'user added', user: user.user});
            }
        });
    });
});

app.get('/deleteuser/:id', function (req, res) {
    var id = req.params.id;
    if (deleteUser(id)) {
        return res.status(200).json({success: 'user is deleted'});
    } else {
        return res.status(400).json({error: 'user not found'});
    }
});

app.post('/updateuser/:id', function (req, res) {
    if (!req.body || !req.params.id) {
        return res.sendStatus(400).json({error: 'Method not allowed'});
    }
    var id = req.params.id;
    var user = req.body;
    console.log('data', req.body);
    if(updateUser(id, user)) {
        return res.status(200).json({success: 'user is updated'});
    } else {
        return res.status(400).json({error: 'user not found'});
    }
});

/**
 * RUN SERVER
 */
console.log('server is running at http://localhost:3000');
app.listen(3000);