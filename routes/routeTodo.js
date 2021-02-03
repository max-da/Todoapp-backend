const express = require("express");
const router = express.Router();
const Todo = require("../models/todoSchema");

/*router.get("/", async (req, res)=>{
    try {
        const data = await Todo.find()
     
    
        res.render("index.ejs", {data:data, error:"", todoEdit: "",totaldata:"",dataToShow:"",dataPerPage:""})
    }
    catch(err) {
       console.log(err)
    }
})*/ 
router.get("/", async (req,res)=> {
    const page = + req.query.page || 1;
    const sorted = +req.query.sorted || 1;
   // console.log(page+"asdas")
    try{
        const totaldata = await Todo.find().countDocuments()

        const dataPerPage = 2;
        const totalDataPart = Math.ceil(totaldata/dataPerPage);
        const dataToShow = dataPerPage * page
        console.log( dataToShow/dataPerPage + 1 )
        const data = await Todo.find().limit(dataToShow).sort({name:sorted})

        res.render("index.ejs",{
            totaldata,
            dataPerPage,
            totalDataPart,
            dataToShow,
            data,
            todoEdit:"",
            error:""
        },
        
        )
    }
    catch(err){
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
        
        res.render("index.ejs", {data:data, error: error, todoEdit:todoEdit,totaldata,
            dataPerPage,
            totalDataPart,
            dataToShow,
           })
     }
    
})

router.get("/delete/:id",async (req, res)=> {
    await Todo.deleteOne({_id:req.params.id})
    res.redirect("/")
})

router.get("/edit/:id", async(req, res)=> {
 try  { const todoEdit = await Todo.findOne({_id:req.params.id})
    let error =""
    const data = await Todo.find()
    res.render("index.ejs",{todoEdit:todoEdit, error:error, data:data,totaldata:"",
        dataPerPage:"",
        totalDataPart:"",
        dataToShow:"",})}
    catch(err){
        console.log(err)
        const error = "Please enter a todo before submitting"
        const data = await Todo.find()
        res.render("index.ejs", {data:data, error: error,totaldata:"",
        dataPerPage:"",
        totalDataPart:"",
        dataToShow:"",
       })
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
res.render("index.ejs", {data:data, error: error, todoEdit:todoEdit,  totaldata:"",
    dataPerPage:"",
    totalDataPart:"",
    dataToShow:"",
    data:""})
    }

    res.redirect("/")
})


// sort 



/* router.get("/sort", async (req, res)=>{
    try {
        const data = await Todo.find().sort({name:1})
      
        res.render("index.ejs", {data:data, error:"", todoEdit: "",  totaldata:"",
        dataPerPage:"",
        totalDataPart:"",
        dataToShow:"",
        data:"",})
     
    }
    catch(err) {
       console.log(err)
    }
    res.redirect("/")
  
}

)

 */



module.exports = router;



