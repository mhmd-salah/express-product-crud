


const express = require('express');

const app = express();
app.use(express.json())
let courses = [
  {
    id: 1,
    title: "js Course",
    price: 1000,
  },
  {
    id: 2,
    title: "React js Course",
    price: 2000,
  },
];

// get all courses
app.get("/api/courses",(req,res)=>{
  res.json(courses);
})
// get single course
app.get("/api/courses/:id",(req,res)=>{
  const id = +req.params.id;
  const course = courses.find((course)=>course.id === id)
  if(!course)return res.status(404).json({ msg: "Course Not Found" });
  res.json(course);
})

// add new course
app.post("/api/courses",(req,res)=>{
  console.log(req.body)
  if(!req.body.title){
    return res.status(400).json({error:"title not provided"})
  }
  if(!req.body.price){
    return res.status(400).json({error:"price not provided"})
  }
  courses.push({id:courses.length+1,...req.body})
  res.status(201).json(courses)
})

// update course
app.patch("/api/courses/:id",(req,res)=>{
  const id= +req.params.id;
  let course = courses.find((course)=>course.id === id)
  course = {...course,...req.body}
  res.status(200).json(course)
})

app.delete("/api/courses/:id",(req,res)=>{
  const id = +req.params.id ;
  courses = courses.filter((course)=>course.id !== id)
  res.json(courses)
})


app.listen(3000,()=>{
  console.log("listening on port 3000");
})