const express = require('express');
const expressHbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');

const app = express();

const filePath = __dirname + '/static';
const dbUsers = path.join(filePath + '/db.txt');

app.use(express.static(path.join(__dirname, 'static')));

app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log('Go on Port 3000');
});

//-------------------------------- GET USERS -----------------------------
function getUsers() {
   return JSON.parse(String(fs.readFileSync(dbUsers)));
}

app.get('/', (req, res) => {
    res.render('index');
});

// ----------------- LOGIN ----------------------------------------------

app.get('/login', ((req, res) => {
    res.render('login');
}));

app.post('/login', ((req, res) => {
    const {login, password} = req.body;

        const user = getUsers().find(user => user.login === login && user.password === password);
        if (user) {
            res.redirect(`users/${user.id}`);
            return;
        }
        res.render('error');
}));

// ----------------- USERS ----------------------------------------------

app.get('/users', ((req, res) => {
    const users = getUsers();
    res.render('users', {users});
}));


app.get('/users/:id', ((req, res) => {
    const {id} = req.params;

    const users = getUsers();
    const user = users.find(user => String(user.id) === id);
    res.render('user', {user});
}));

// ----------------- REGISTRATION ----------------------------------------------

app.get('/registration', (req, res) => {
   res.render('registration');
});

app.post('/registration', ((req, res) => {
    const {name, phone, age, login, password} = req.body;
    const users = getUsers();

    for (const user of users) {
        if (user.login === login || user.phone === phone) {
            res.render('registration', {logError: true});
            return;
        }
    }
    users.push({id: users.length, name, phone, age, login, password});

    fs.writeFile(dbUsers, JSON.stringify(users), err => {
        if (err) {
            console.log(err);
            return;
        }
    });
    res.redirect('login');
}));
