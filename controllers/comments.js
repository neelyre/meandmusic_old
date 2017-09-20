const express = require('express');
const router = express.Router();
const Comments = require('../models/comments.js');

router.get('/', function(req, res){
    Todos.find({}, function(err, foundTodos){
        res.json(foundTodos);
    });
});

router.post('/', (req,res)=>{
  Todos.create(req.body, function(err, createdTodo){
       res.json(createdTodo);
     });
});

router.delete('/:id', function(req, res){
    Todos.findByIdAndRemove(req.params.id, function(err, deletedTodo){
        res.json(deletedTodo);
    });
});

router.put('/:id', (req, res)=>{
    Todos.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedTodo)=>{
        res.json(updatedTodo);
    });
});

module.exports = router;
