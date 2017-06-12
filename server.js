const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/',function(req,res){
  res.sendFile('index.html');
})

app.get('/about',function(req,res){
  res.sendFile(path.join(__dirname + '/views/about.html'));
})

app.get('/syllabus',function(req,res){
  res.sendFile(path.join(__dirname + '/views/syllabus.html'));
})

app.post('/send-enquiry',jsonParser, function(req,res){
  setupEmail(req.body);
  res.send('Thank you!!');
});

function setupEmail(data){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: {
      user: "",//sender email goes here
      pass: "", //sender password goes here
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var html = `<h1> Firstname: ${data.name} </h1>  <h1> Lastname: ${data.phone} </h1>
  <h1> Email: ${data.email} </h1>   <h1> Message: ${data.message} </h1>`

  var mailOptions = {
    from: '" sender name " sender address', // sender address
    to: "", // list of receivers
    subject: "Hello ✔", // Subject line
    text: 'Hello', // plain text body
    html: html// html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
}

app.listen(port)
