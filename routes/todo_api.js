const express = require('express')
const mongoose = require('mongoose');
const Todo = require('../models/todo')

const router = express.Router()


router.post('/add',  async(req,res)=>{
       const todo = new Todo({
        title:req.body.title,
        description:req.body.description,
        priority: req.body.priority,
    });
    try{
        await todo.save();
        res.status(200).send({message:'Task added'})
        console.log('new task created!');
    }catch(err){
        console.log(err)
        res.status(400).send(err);
    }

});

router.get('/:id', async(req,res)=>{

    try{
        const todo = await Todo.findOne({id :req.params.id});
    if(todo == null) res.send({message:'Task not found'})
    res.send({task: todo})
        
    }catch(err){
        console.log(err)
        res.status(500).send({message:'Task not found'});
    }
    
});

router.get('/', async(req,res)=>{
    const todos = await Todo.find({});
    res.send({tasks: todos})
});

router.delete('/:id',async(req,res)=>{
    try {
        await Todo.findByIdAndDelete(req.params.id)
        res.send({message:'Task deleted'})

    }catch(err){
        console.log(err)
        res.status(500).send({message:'Task not found'});
    }
});

router.put('/id', async(req,res)=>{

    try{
        const todo =  await Todo.findByIdAndUpdate(req.params.id, {completed:true})
        res.send({message: 'Task Completed'});
    }catch(err){
        console.log(err)
        res.status(500).send({message:'Task not found'});
    }
 

})
