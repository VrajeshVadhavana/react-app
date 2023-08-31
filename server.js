var express = require("express");
var app = express();
var port = process.env.PORT || 9090;
var mongodb = require("mongodb").MongoClient;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+"/public"))
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});
app.post("/post",(req,res)=>{
    console.log(req.body)
    res.sendFile(__dirname+"/public/index.html");
    mongodb.connect("mongodb+srv://vrajesh:vrajesh2001@cluster0.gwhxuv9.mongodb.net/").then((dbs)=>{
        console.log("database conneted successfully");      
        var zz = dbs.db("new_d");  
        zz.collection("react").insertOne({Fullname:req.body.fname}).then(()=>{
            console.log("Data inserted successfully");
        }).catch(function(err){
            console.log("Error");
        })
    }).catch(function(err){
        console.log("Error")
    })
})
app.listen(port,(err)=>{
    if(err){
        console.log("Error");
    }
    else{
        console.log("Server is running on "+port);
    }
})
