var express = require("express");
var bodyParser = require ("body-parser");
var request = require("request");
var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000 ,function (){
  console.log("Port 3000 is running");
});

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/",function(req,res){
var fname = req.body.fname;
var lname = req.body.lname;
var email = req.body.email;
console.log(fname,lname,email);

var data = {
  members: [
    { email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:fname,
        LNAME:lname
      }},
  ]
};

var jsonData = JSON.stringify(data);

var options = {
  url:'https://us4.api.mailchimp.com/3.0/lists/02e03dbd64',
  method:'POST',
  headers:{
    "Authorization": "atul 2a4012a92e40ad8dd1b39baf7aa74945-us4"
  },
  body: jsonData
};

request(options,function(error, response, body){
  var status = response.statusCode;
if (status == 200){
  res.sendFile(__dirname + "/success.html");
} else if (error || (status != 200)){
  res.sendFile(__dirname + "/failure.html");
}
});


});


app.post('/failure',function(req,res){
  res.redirect("/");
})







// API key
// 2a4012a92e40ad8dd1b39baf7aa74945-us4

// audience key
// 02e03dbd64
