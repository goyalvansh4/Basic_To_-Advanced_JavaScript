const express = require('express');

const router = express.Router();

const Joi = require('joi');

const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {type: String, required: true,minlength: 3,maxlength: 30}
  
});

const Category = mongoose.model('Category',categorySchema);


router.get('/api/categories', async(req,res)=>{
    let categories = await Category.find();
    res.send(categories);
});

router.post('/api/categories', async(req,res)=>{
  const {error} = validateData(req.body);
  if(error) return res.status(400).send(error.details[0].message);
   let category = new Category({ 
    name: req.body.name
  });
  //categories.push(category);
  await category.save();
  console.log(category);
  res.send(category);
})


router.put('/api/categories/:id',async(req,res)=>{

  const {error} = validateData(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const category = await Category.findByIdAndUpdate(req.params.id,{name: req.body.name},{new: true});
  if(!category) return res.status(404).send('The category with the given ID was not found');

  //category.name = req.body.name;
  res.send(category);
})


router.delete('/api/categories/:id',async(req,res)=>{
  const category = await Category.findByIdAndRemove(req.params.id);
  if(!category) return res.status(404).send('The category with the given ID was not found');
    res.send(category);
});

router.get('/api/categories/:id',async(req,res)=>{
  const category = await Category.findById(req.params.id);
  if(!category) return res.status(404).send('The category with the given ID was not found');
  res.send(category);
});

function validateData(category){
  const schema ={
    name: Joi.string().min(3).required(),
  }
  return Joi.validate(category,schema);
}

module.exports = router;