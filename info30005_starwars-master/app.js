var express = require('express')
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// Whole array, with index
var people = [
    {  "name": "Luke Skywalker",
        "height": "172",
        "mass": "77",
        "hair_color": "blond",
        "skin_color": "fair",
        "eye_color": "blue",
        "birth_year": "19BBY",
        "gender": "male",
        "homeworld": "https://swapi.co/api/planets/1/",
        "films": [
        "https://swapi.co/api/films/2/",
        "https://swapi.co/api/films/6/",
        "https://swapi.co/api/films/3/",
        "https://swapi.co/api/films/1/",
        "https://swapi.co/api/films/7/"]
    },
    {
        "name": "C-3PO",
        "height": "167",
        "mass": "75",
        "hair_color": "n/a",
        "skin_color": "gold",
        "eye_color": "yellow",
        "birth_year": "112BBY",
        "gender": "n/a",
        "homeworld": "https://swapi.co/api/planets/1/",
        "films": [
        "https://swapi.co/api/films/2/",
        "https://swapi.co/api/films/5/",
        "https://swapi.co/api/films/4/",
        "https://swapi.co/api/films/6/",
        "https://swapi.co/api/films/3/",
        "https://swapi.co/api/films/1/"]
     },
     {
        "name": "R2-D2",
        "height": "96",
        "mass": "32",
        "hair_color": "n/a",
        "skin_color": "white, blue",
        "eye_color": "red",
        "birth_year": "33BBY",
        "gender": "n/a",
        "homeworld": "https://swapi.co/api/planets/8/",
        "films": [
        "https://swapi.co/api/films/2/",
        "https://swapi.co/api/films/5/",
        "https://swapi.co/api/films/4/",
        "https://swapi.co/api/films/6/",
        "https://swapi.co/api/films/3/",
        "https://swapi.co/api/films/1/",
        "https://swapi.co/api/films/7/"]
     },
     {
        "name": "Darth Vader",
        "height": "202",
        "mass": "136",
        "hair_color": "none",
        "skin_color": "white",
        "eye_color": "yellow",
        "birth_year": "41.9BBY",
        "gender": "male",
        "homeworld": "https://swapi.co/api/planets/1/",
        "films": [
        "https://swapi.co/api/films/2/",
        "https://swapi.co/api/films/6/",
        "https://swapi.co/api/films/3/",
        "https://swapi.co/api/films/1/"]
     },
     {
        "name": "Leia Organa",
        "height": "150",
        "mass": "49",
        "hair_color": "brown",
        "skin_color": "light",
        "eye_color": "brown",
        "birth_year": "19BBY",
        "gender": "female",
        "homeworld": "https://swapi.co/api/planets/2/",
        "films": [
        "https://swapi.co/api/films/2/",
        "https://swapi.co/api/films/6/",
        "https://swapi.co/api/films/3/",
        "https://swapi.co/api/films/1/",
        "https://swapi.co/api/films/7/"]
     }];

app.get('/',function(req,res){
    res.send("main route");
});

// Return all the values in the array
app.get('/api',function(req,res){
	res.send(people);
});

// Return a specific object based on a particular ID (param)
app.get('/api/:id',function(req,res){    // requesting an ID, params = name of ID
	res.send(people[req.params.id]);
});

// Add a new person to the array
app.post('/api', function(req,res){
    var newperson = {
        "name": req.body.name,
        "height": req.body.height,
        "mass": req.body.mass,
        "hair_color": req.body.hair_color,
        "skin_color": req.body.skin_color,
        "eye_color": req.body.skin_color,
        "birth_year": req.body.birth_year,
        "gender": req.body.gender,
        "homeworld": req.body.homeworld,
        "films": req.body.films
    };
    people.push(newperson)
    res.send(newperson)
})

// Update data from an existing person (any of the attributes)
app.post('/api/:id', function(req,res) {
    if(req.params.id<=people.length-1){  // check if ID exists
        var newperson = {
            "name": req.body.name,
            "height": req.body.height,
            "mass": req.body.mass,
            "hair_color": req.body.hair_color,
            "skin_color": req.body.skin_color,
            "eye_color": req.body.skin_color,
            "birth_year": req.body.birth_year,
            "gender": req.body.gender,
            "homeworld": req.body.homeworld,
            "films": req.body.films
        };
		people[req.params.id]=newperson;
		res.send(newperson);
    } else {
		res.send("Sorry, ID not found");	// if ID not in DB, return "ID not found"
	}
})

// Delete an existing person from the array based on a name provided as input (param)
app.delete('/api/delete/:id', function(req,res) {
    if(req.params.id<=people.length-1){
        people.splice(req.params.id,1);
    }
    res.send(people);
})


// Start the server
app.listen(3000,function(req,res){
	console.log('Express listening on port 3000');
});