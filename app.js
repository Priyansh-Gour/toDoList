const express=require("express")
const bodyParser=require("body-parser");
const getDate = require("./date");
const date= require(__dirname+"/date.js")
const mongoose=require("mongoose")
const DB = 'mongodb+srv://priyanshgour817:' + encodeURIComponent("Mypassword@123") + '@cluster0.78tzdeo.mongodb.net/To-do-list';
const app=express();
// var Items=["Buy Food","Cook Food","Eat Food"];
// let workItems=[];

a


// database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

// schema
const itemSchema={
    name:String
}
// model/
const Item = mongoose.model("item",itemSchema);


const item1=new Item({
    name:"Welcome to todolist!"
})
const item2=new Item({
    name:"Hit the + button to add a new item"
})
const item3=new Item({
    name:"<---- Hit this to delete an Item"
})

const defaultItems=[item1,item2,item3];
const listSchema={
    name:String,
    items:[itemSchema]
};

const List=mongoose.model("List",listSchema);



app.get("/",function(req,res){
    let day=date.getDate(); 
    // document
    Item.find()
    .then((items) => {
        if(items.length===0){
            Item.insertMany(defaultItems)
            .then(() => {
                console.log('Items were successfully inserted.');
            })
            .catch((err) => {
                console.error('Error inserting Items:', err);
            });
            res.redirect("/")
        }else{
            res.render('List',{listTitle:day,newListItems:items})
        }
    })
    .catch((err) => {
        console.error(err);
    });
})
app.post("/",function(req,res){
    var newItems=req.body.newItem;

    const item=new Item({
        name:newItems
    });
    item.save();
    res.redirect("/");
})

app.get("/:customListName",function(req,res){
    const customListName=req.params.customListName

    List.findOne({ name: customListName })
    .then((list) => {
        if (list) {
        res.render("List",{listTitle:list.name,newListItems:list.items})
         // show an existing list
        } else {
            //create a new list
            const list=new List({
                name:customListName,
                items:defaultItems
            })
            list.save();
            res.redirect("/"+customListName)
        }
    })
    .catch((error) => {
        console.error(error);
    });
})

app.post("/delete",function(req,res){
    const checked_item_id=(req.body.checkbox);
    Item.findByIdAndRemove(checked_item_id)
    .then((removedTask) => {
        if (removedTask) {
        console.log('Task removed successfully:', removedTask);
        res.redirect("/")
        } else {
        console.log('Task not found.');
        }
    })
    .catch((err) => {
        console.error('Error while removing the task:', err);
    })  
})
app.get("/about",function(req,res){
    res.render("about")
})

app.listen(3000,function(){
    console.log("Server is running on port 3000")
})






