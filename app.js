const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ =require("lodash");

mongoose.connect('mongodb+srv://itsmesiva:ursa1376@cluster0.1fpwz.mongodb.net/todoDB', {useNewUrlParser: true, useUnifiedTopology: true});



const app = express();

app.use(bodyParser.urlencoded({extended :true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

 
 var  day = date.getDate();


const Itemschema = 
({
	name : 
 	{
		type : String,
		required: true
	}
});

const Item = mongoose.model("item", Itemschema);

/*const item1 = new Item(
{
	name:"one"
});

const item2 = new Item(
{
	name:"two"
});

const item3 = new Item(
{
	name:"three"
});*/

const club = [];


//doc for mongoose insertion

const ListSchema = {

	name : String,
	contains: [Itemschema]
};

const List = mongoose.model("list", ListSchema);
 



// finding or accessing DB (array of items)


app.get("/", function(req, res)
	{

Item.find({}, function(err,results)
{

if(results.length === 0)
{
	/*var  day = date.getDate();*/

	res.render("list", {DAY : day, ents : results});

	

/*Item.insertMany(club, function(err) {});	
res.redirect("/");*/
}
else{	/*

var  day = date.getDate();*/

res.render("list", {DAY : day, ents : results});
}


});
});

	

//insertion of entry//
app.post("/", function(req, res)
{
	let itemName = req.body.entry;
	let listName = req.body.button;
	console.log(listName);

	const item4 = new Item
	(
	{
		name: itemName

	});

	if(listName === day)
	{

		item4.save();

	res.redirect("/"); 

	}else
	
	{

		List.findOne({name: listName}, function(err, foundlist)
		{

			foundlist.contains.push(item4);
			foundlist.save();
			res.redirect("/" + listName ); 

		});


	}
	

	});
	
		//custom todo list

app.get("/:newDB", function(req,res)
{
const Ntodo = _.capitalize(req.params.newDB);




List.findOne({name: Ntodo}, function(err, foundlist)

{
	if(!err)
	{
		if(!foundlist)
		{
			//create new todolist


 const inventory = new List (
 {
 	name: Ntodo,
 	contains : club

 });

 inventory.save();

 res.redirect("/" + Ntodo);




		}else
		{
			//show existing todolist 

			res.render("list", {DAY : foundlist.name, ents : foundlist.contains})
		}
	}
});


});




//deletion of each item//

app.post("/delete", function(req,res)
	{
		let remitem =req.body.checkbox;
		let todelete =req.body.del;

		if(todelete === day)
		{
		Item.findByIdAndRemove(remitem, function(err){
			if(!err)
			{
				console.log("deleted");
				res.redirect("/");
			}

		});
	}else
	{
		List.findOneAndUpdate({name: todelete},{$pull: {contains: {_id: remitem}}}, function(err, foundlist)
		{
			if(!err)
			{
				res.redirect("/" + todelete);
			}
		});



	}
	});


app.listen(process.env.PORT || 3000, function()
	{

		console.log("at 3000");
	});

