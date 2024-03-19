const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/testDatabase')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err)); 

//schema


const courseSchema = new mongoose.Schema({
   name: {type:String , required:true , minlength:5 , maxlength:200},
   category:{
    type:String,
    required:true,
    enum:['DSA','Web','Mob','Data Science']
   },
   creator: {type:String,required:true},
   publishedDate: {type: Date, default: Date.now},
   isPublished: {type:Boolean,required:true},
   rating:{type:Number,required:function(){return this.isPublished}},
});

//model

const Course = mongoose.model('Course',courseSchema);

async function createCourse(){
  const course = new Course({
   name:"CSS-3",
   category:'Web',
   creator: "Sarthak",
   isPublished: false,
   rating:3
})

const result = await course.save();

console.log(result);

}

 createCourse();


//comparison operators 
/*
eq:(equal to)
gt:(greater than)
gte:(greater than equal to)
lt
lte
in
not in

*/

/*
Logical operator

or()
and()
*/
async function getCourses(){
  const courses = await Course.find({rating:{$gte:4}}).select({name:1});
  console.log(courses);
}
getCourses();