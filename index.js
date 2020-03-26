var express = require('express');
var routes = require('../routes.js');
var app = express();

app.use('/', (req, res) => {
    res.render('chat.ejs', {message: null});
    //res.send('Default message.');
});

app.use('/chat', (req, res) => {
    res.render('chat.ejs', {message: null});
});


app.post('/savenewchat', routes.post_savenewchat);
app.post('/getlastchat', routes.get_lastchat);

// This starts the web server on port 3000. 
app.listen(3000, () => {
    console.log('Listening on port 3000. Listen on http://localhost:3000/');
});
