const express = require('express');
const todoController = require('./controller/todoController')

const app = express();

//set up template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);


app.listen(8000)
    console.log('App runing on port 8000');