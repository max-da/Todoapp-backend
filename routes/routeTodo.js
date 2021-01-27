const express = require("express");
const router = express.Router();
const Todo = require("../models/todoSchema");

router.get("/", async (req, res)=>{
    try {
        const data = await Todo.find()
        res.render("index.ejs", {data:data, error:"", todoEdit: ""})
    }
    catch(err) {
       console.log(err)
    }
})
router.get("/addData", async (req, res)=> {
    res.render("add.ejs")
})

router.post("/addData", async (req, res)=> {
    console.log(req.body.name)
     try { await new Todo ({
         name: req.body.name
     }).save()
     res.redirect("/")}
     catch(err) {
        console.log(err)
        const error = "Please enter a todo before submitting"
        const data = await Todo.find()
        const todoEdit = "";
        res.render("index.ejs", {data:data, error: error, todoEdit:todoEdit})
     }
    
})

router.get("/delete/:id",async (req, res)=> {
    await Todo.deleteOne({_id:req.params.id})
    res.redirect("/")
})

router.get("/edit/:id", async(req, res)=> {
 try  { const todoEdit = await Todo.findOne({_id:req.params.id})
    let error =" "
    const data = await Todo.find()
    res.render("index.ejs",{todoEdit:todoEdit, error:error, data:data})}
    catch(err){
        console.log(err)
        const error = "Please enter a todo before submitting"
        const data = await Todo.find()
        res.render("index.ejs", {data:data, error: error})
    }
})

router.post("/edit", async (req, res)=> {
    console.log(req.body)
 try { await Todo.updateOne({_id:req.body.id},{
        name:req.body.name},
        { runValidators: true })}

  
    catch(err){
console.log(err)

const error = "Please finish editing todo before submitting"
const data = await Todo.find()
const todoEdit = "";
res.render("index.ejs", {data:data, error: error, todoEdit:todoEdit})
    }

    res.redirect("/")
})
module.exports = router;