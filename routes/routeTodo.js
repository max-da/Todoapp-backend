const express = require("express");
const router = express.Router();
const Todo = require("../models/todoSchema");

router.get("/", async (req, res)=>{
    try {
        const data = await Todo.find()
        res.render("index.ejs", {data:data, error:""})
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
        res.render("index.ejs", {data:data, error: error})
     }
    
})

module.exports = router;