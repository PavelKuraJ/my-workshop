//new server
'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.json());
app.use(cookie());

const users = {
  // will be users here
  'p.kuryzhov@corp.mail.ru': {
    email: 'p.kuryzhov@corp.mail.ru',
    password: 'password',
    age: 23,
    score: 2500,
    images: [
      'https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c251.0.778.778a/s640x640/140853636_411698430119641_4125413062374448063_n.jpg?tp=1&_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=101&_nc_ohc=O-0DpVd4DeoAX9BqpEn&edm=APU89FAAAAAA&ccb=7-4&oh=cf13d525c1b37824029a0e6977495ffc&oe=609BC914&_nc_sid=86f79a',
      'https://scontent-arn2-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/c0.0.1035.1035a/s640x640/149146908_241628067633231_792817473876990415_n.jpg?tp=1&_nc_ht=scontent-arn2-1.cdninstagram.com&_nc_cat=103&_nc_ohc=K5xYb_HIKYEAX9aBfKH&edm=ABfd0MgAAAAA&ccb=7-4&oh=465e3099af1b4dea32fbaad5c289962b&oe=609A595B&_nc_sid=7bff83',
    ]
  },
};
const ids = {};

app.post('/signup', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;
  const age = req.body.age;
  if (
      !password || !email || !age ||
      !password.match(/^\S{4,}$/) ||
      !email.match(/@/) ||
      !(typeof age === 'number' && age > 10 && age < 100)
  ) {
    return res.status(400).json({error: 'Не валидные данные пользователя'});
  }
  if (users[email]) {
    return res.status(400).json({error: 'Пользователь уже существует'});
  }

  const id = uuid();
  const user = {password, email, age, score: 0, images: []};
  ids[id] = email;
  users[email] = user;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id});
});

app.post('/login', function (req, res) {
  const password = req.body.password;
  const email = req.body.email;
  if (!password || !email) {
    return res.status(400).json({error: 'Не указан E-Mail или пароль'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
  }

  const id = uuid();
  ids[id] = email;

  res.cookie('podvorot', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json({id});
});

app.get('/me', function (req, res) {
  const id = req.cookies['podvorot'];
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  users[email].score += 1;

  res.json(users[email]);
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server listening port ${port}`);
});



/*
//old server
const fs = require('fs');
const http = require ('http'); 
const debug = require('debug')('http')

const server = http.createServer((req, res) => {
    debug('requested', req.url);

    const path = `./public${req.url === '/' ? '/index.html' : req.url}`;

    // to outside interference checking
    const ip = res.socket.remoteAddress;
    const port = res.socket.remotePort;
    // console.log -> debug
    debug(`Your IP address is ${ip} and your source port is ${port}.`);

    file = fs.readFile(path, (err, file) =>{
        if (err){
            debug('file read error', path, err);
            res.write('error');
            res.end();
            return; 
        }
        debug('file read', path);
        
        res.write(file);
        res.end();
    });   
    
    debug('after read file')
});

server.listen(3001);   */