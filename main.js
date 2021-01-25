const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
require("dotenv/config")
//req models
const router = require("./routes/routeTodo");
app.use("/", router)
app.set("view engine", "ejs")

mongoose.connect(process.env.DbLogin, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if (err) return
    app.listen(8000,()=>{
        console.log("Portnumber:8000")
    })
})
