const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items =["Buy Food","Cook Food","Eat food"];
let work=[];
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function (req,res){

    let today = new Date();

    let options = {
        weekday:"long",
        day:"numeric",
        month:"long"
    };

    let day = today.toLocaleDateString("en-US",options);
    res.render("list",{ listTitle: day, newListItem: items});
});

app.post("/",function (req,res) {

    let item = req.body.newItem;

    if(req.body.list === "Work List"){   
        work.push(item);
        res.redirect("/work");
    }
    else{    
        items.push(item);   
        res.redirect("/");
    }
    
})

app.get("/work",function(req,res){
    res.render("list",{listTitle: "Work List", newListItem: work })
})


app.listen(3000,function() {
    console.log("Server is running at port 3000");
})