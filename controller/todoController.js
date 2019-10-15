const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// var data = [{item:'get milk'},{item:'walk Dog'},{item:'Learn Docker'}];

var urlencondedParser = bodyParser.urlencoded({extended:false});

mongoose.connect('mongodb://localhost:27017/Todo-App',{ useNewUrlParser: true ,useUnifiedTopology: true});


const todoSchema = new mongoose.Schema({
    item:String
});

const Todo = mongoose.model('Todo',todoSchema);
// const itemOne = Todo({item:'buy flowers'}).save(function(err){
//     if(err) throw err;
//     console.log('item saved');
// })

module.exports = function(app){
    app.get('/todo',function(req,res){
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos:data});
        })
        
    });

    app.post('/todo',urlencondedParser, function(req,res){

        const newTodo = Todo(req.body).save(function(err,data){
            if(err)throw err;
            res.json(data);
        })
      
    });

    app.delete('/todo/:item',function(req,res){

        Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
            if(err) throw err;
            res.json(data)
        })
       
    });
}