//server, new part
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
//server, old part
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