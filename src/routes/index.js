const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/', async function(req,res){
    const tasks = await Task.find();
    res.render('index.ejs', {
        tasks
    });
});

router.post('/add', async function(req, res){

    const task = new Task(req.body);
    await task.save();
    console.log(req.body);
    res.redirect('/');
});

router.post('/edit/:id', async function(req, res){
    const { id } = req.params;
    await Task.update({_id: id}, req.body);
    res.redirect('/');
});

router.get('/done/:id', async function(req, res){
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');

} );

router.get('/edit/:id', async function(req, res){
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('edit.ejs', {
        task
    });

} );

router.get('/delete/:id', async function(req, res){
    const { id } = req.params;
    await Task.remove({_id: id});
    res.redirect('/');

} );

module.exports = router;