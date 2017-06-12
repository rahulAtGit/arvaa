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
  res.status(200).json({message: 'Thank you'});
});

function setupEmail(data){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    secure: false,
    auth: {
      user: "freelance.sachin1245@gmail.com",//sender email goes here
      pass: "stealthmode", //sender password goes here
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var html = `<div class="container" style="display:flex;flex-direction:column;justify-content:center;align-items:center;color:white;">
    <div class="wrapper" style="display:inline-block;background-color:#f1c984;color:#333;padding:20px;">
        <h1> Name: <span style="font-size: 20px;font-weight:normal;">${data.name}</span></h1>
        <h1> Phone: <span style="font-size: 20px;font-weight:normal;">${data.phone} </span></h1>
        <h1> Email: <span style="font-size: 20px;font-weight:normal;">${data.email} </span></h1>
        <h1> Message: <span style="font-size: 20px;font-weight:normal;">${data.message}</span></h1>
    </div>
</div>`


  var mailOptions = {
    from: '"Sachin C" freelance.sachin1245@gmail.com', // sender address
    to: "sachinwh@gmail.com", // list of receivers
    subject: "Enquiry Data ✔", // Subject line
    text: 'Enquiry Data', // plain text body
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
