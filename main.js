const { path } = require("dotenv/lib/env-options");
const express = require("express");
const mongoose = require("mongoose");
const nodeSass = require("node-sass-middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}));
require("dotenv/config")

const router = require("./routes/routeTodo");
app.use("/", router)
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public/style"))
app.use(nodeSass(
       { src:__dirname + "/scss",
        dest: __dirname + "/public/style"}

)
    )

mongoose.connect(process.env.DbLogin, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err)=>{
    if (err) return
    app.listen(8000,()=>{
        console.log("Portnumber:8000")
    })
})
