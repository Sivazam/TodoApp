const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended :true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

 let newL = [];


app.get("/", function(req, res)
	{

let today = new Date();


let options = 
{

	weekday : "long",
	day : "numeric",
	month : "long"
};

let day = today.toLocaleDateString("en-US", options);



res.render("list", {DAY : day, ents : newL});
	
	});

app.post("/", function(req, res)
{
   let add = req.body.entry;
  newL.push(add);
  res.redirect("/");

});


app.listen("3000", function()
	{

		console.log("at 3000");
	});

