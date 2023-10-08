const express=require("express")
const bodyParser=require("body-parser");
const getDate = require("./date");
const date= require(__dirname+"/date.js")

const app=express();
var Items=["Buy Food","Cook Food","Eat Food"];
let workItems=[];

app.set('view engine','ejs');

app.use(express.static("public"))

app.use(bodyParser.urlencoded({extended:true}))

app.get("/",function(req,res){
    let day=date.getDate();
    res.render('List',{listTitle:day,newListItems:Items});
})
app.post("/",function(req,res){
    var newItems=req.body.newItem;
    if(req.body.List==="Work"){
        workItems.push(newItems)
        res.redirect("/work")
    }else{
        Items.push(newItems);
        res.redirect("/");
    }
    Items.push(newItems);
    res.redirect("/");
})


app.get("/work",function(req,res){
    res.render("list",{listTitle:"Work List",newListItems:workItems})
})
app.post("/work",function(req,res){
    let item =req.body.newItem
    workItems.push(item)
    res.redirect("/work")
})

app.get("/about",function(req,res){
    res.render("about")
})

app.listen(3000,function(){
    console.log("Server is running on port 3000")
})






