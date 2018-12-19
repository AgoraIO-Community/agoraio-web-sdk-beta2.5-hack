var express = require('express');
var path = require('path')
var pg = require('pg');
var http  = require('http');
var conString = "postgres://wdenuaod:spmdWA53gm2H5LyhY0gUpW3I_XjPws2k@baasu.db.elephantsql.com:5432/wdenuaod";
var client = new pg.Client(conString);
client.connect();


var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET','POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
 

app.get("/",function(req,res){
  res.send("Server Working")
  })
  app.get("/favicon.ico",function(req,res){
    res.send("Server Working")
    })


// setInterval(function() {
//   http.get("http://<your app name>.herokuapp.com");
// }, 300000);




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 

	

	
app.post('/signup',function(req,res){
  client.query('Insert Into Users(Name,Email,Password) VALUES($1,$2,$3)' , [req.body.name,req.body.email,req.body.password],function(err,result) {
    console.log(client['hasExecuted']);
    if(err)
        {
          res.status(200).send[{"Status":err}];
 
         }
         else
         {
          res.status(200).send("Success");

         }
        });
})

app.post('/login',function(req,res){
  client.query("SELECT * FROM USERS WHERE  Email =($1) AND password =($2)  ",[req.body.email,req.body.password],function(err,result){
    if(err)
    {
      res.send(JSON.stringify([{"login":"False"}]))
     }
     else 
     {
      res.status(200).send("Login Success");

     }
  
   
  })
  
})


app.get('/users',function(req,res){
  client.query("SELECT Email,Rooms,Name FROM USERS ",function(err,result){
    if(err)
    {
      res.send(JSON.stringify([{"login":"False"}]))
     }
     else 
     {
      res.status(200).send(result.rows);

     }
  
   
  })
  
})
app.post('/addroom',function(req,res){

  client.query("SELECT Rooms FROM USERS WHERE Email =($1) ",[req.body.email],function(err,result){
    if(err)
    {
      res.send(JSON.stringify([{"login":"False"}]))
     }
     else 
     {
if  (result.rows[0]['rooms'] === null)
{
  client.query("Update  USERS Set Rooms = ($1) WHERE Email =($2) ",[req.body.room,req.body.email],function(err,result){
  if(err) 
  {

  }
  else
  {
    res.send("Updated")
  }
  })
}
else 
{  var roomfinal = result.rows[0]['rooms'] +','+ req.body.room;
  client.query("Update  USERS Set Rooms = ($1) WHERE Email =($2) ",[roomfinal,req.body.email],function(err,result){
    if(err) 
    {
  
    }
    else
    {
      res.send("Updated")
    }
  })

}
     }
  
   
  })
  
})
app.post('/deleteroom',function(req,res){

  client.query("SELECT Rooms FROM USERS WHERE Email =($1) ",[req.body.email],function(err,result){
    if(err)
    {
      res.send(JSON.stringify([{"login":"False"}]))
     }
     else 
     {
if  (result.rows[0]['rooms'] === null)
{
  res.send("No Room Found")
 
}
else 
{  
  var roomfinal = result.rows[0]['rooms'].split(',')
  var index = roomfinal.indexOf(req.body.room);
roomfinal.splice(index,1)
  var str = ""
  console.log(roomfinal,"sdjh")

  roomfinal.forEach(element => {
    str=str+element+',';
  });

  str=str.substring(0,str.length-1);
console.log(str)
  client.query("Update  USERS Set Rooms = ($1) WHERE Email =($2) ",[str,req.body.email],function(err,result){

    if(err) 
    {
  
    }
    else
    {
      res.send("Updated")
    }
  })

}
     }
  
   
  })
  
})

app.post('/roomcheck',function(req,res){
  console.log((req.body['room']))
  console.log((req.body['email']))

  client.query("SELECT Rooms FROM USERS WHERE Email =($1) ",[req.body['email']],function(err,result){
    if(err)
    {
      res.send(JSON.stringify([{"login":"False"}]))
     }
     else 
     {
if  (result.rows[0]['rooms'] === null)
{
  res.send("No Room Found")
 
}
else 
{  
  var roomfinal = result.rows[0]['rooms'].split(',')
  var index = roomfinal.indexOf(req.body.room);
  if(index> -1 )
  {
  res.send("Authorized")
  }
  else 
  {
    res.send("Not Authorized")
  }
}}})
})

  
   
var port = process.env.PORT||3000;

app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});