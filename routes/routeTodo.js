const express = require("express");
const router = express.Router();
const Todo = require("../models/todoSchema");

router.get("/", async (req, res)=>{
    try {
        const data = await Todo.find()
        res.render("index.ejs", {data:data, error:"", Todoedit: ""})
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
        const Todoedit = "";
        res.render("index.ejs", {data:data, error: error, Todoedit:Todoedit})
     }
    
})

router.get("/delete/:id",async (req, res)=> {
    await Todo.deleteOne({_id:req.params.id})
    res.redirect("/")
})

router.get("/edit/:id", async(req, res)=> {
 try  { const Todoedit = await Todo.findOne({_id:req.params.id})
    let error =" "
    const data = await Todo.find()
    res.render("index.ejs",{Todoedit:Todoedit, error:error, data:data})}
    catch(err){
        console.log(err)
        const error = "Please enter a todo before submitting"
        const data = await Todo.find()
        res.render("index.ejs", {data:data, error: error})
    }
})

router.post("/edit", async (req, res)=> {
 try  { await Todo.updateOne({_id:req.body.id},{
        name:req.body.name
    })}
  
    catch(err){
console.log(err)
    }
    console.log(req.body)
    res.redirect("/")
})
module.exports = router;