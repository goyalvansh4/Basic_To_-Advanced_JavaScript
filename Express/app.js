const express = require('express')
const app = express()

const myMiddleWare = require('./Middleware/middle.js');

//get post delete put


//middleware


app.use(express.json());



//For read operation get() method is used
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/about', function (req, res) { 
  res.send('About Page');
});

app.get('/contact', function (req, res) {
  res.send('Contact Page');
})

app.use(myMiddleWare);


let courses =[
  {id:1,name:"JavaScript"},
  {id:2,name:"Node.js"},
  {id:3,name:"Express.js"}
]


app.get('/courses',(req,res)=>{
  res.send(courses);
})
//For create operation post() method is used
// app.post('/courses',(req,res)=>{
//   const course={
//     id:courses.length + 1,
//     name:req.body.name
//   }
//   courses.push(course);
//   res.send(course);
// })


//For update operation put() method is used

app.put('/courses/:coursename',(req,res)=>{
  let course = courses.find( (course)=> course.name === req.params.coursename);
  if(!course) res.status(404).send('The course which you are looking for is not found');
  course.name = req.body.name;
  req.send(course);
})

//routes parameters

app.get('/courses/:coursename',(req,res)=>{
  // let course = courses.find( (course)=> course.id === parseInt(req.params.id));
  let course = courses.find( (course)=> course.name === req.params.coursename);
  if(!course) res.status(404).send('The course which you are looking for is not found');
  res.send(course);
})

app.delete('/courses/:coursename',(req,res)=>{
  let updatedArray = courses.filter( (course)=> course.name !== req.params.coursename);
  courses = updatedArray;
  res.send(courses);
})

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Port is running on ${port}`);
});