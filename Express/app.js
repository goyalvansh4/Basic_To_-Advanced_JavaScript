const express = require('express')
const app = express()


//get post delete put

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/about', function (req, res) { 
  res.send('About Page');
});

app.get('/contact', function (req, res) {
  res.send('Contact Page');
})

const courses =[
  {id:1,name:"JavaScript"},
  {id:2,name:"Node.js"},
  {id:3,name:"Express.js"}
]

//routes parameters

app.get('/courses/:coursename',(req,res)=>{
  // let course = courses.find( (course)=> course.id === parseInt(req.params.id));
  let course = courses.find( (course)=> course.name === req.params.coursename);
  if(!course) res.status(404).send('The course which you are looking for is not found');
  res.send(course);
})


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Port is running on ${port}`);
});