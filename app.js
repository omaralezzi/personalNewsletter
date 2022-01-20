const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// use static to plblic css and images folder inside public folder
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req,res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  // console.log(firstName, lastName, email);
  // res.send('Thank you for signing up, ' + firstName + ' ' + lastName);
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  console.log(jsonData);

  // create a function to send the data to mailchimp
  const url = "https://us20.api.mailchimp.com/3.0/lists/770fef9d7c";
  const options = {
    method: "POST",
    auth: "omar:34e7ad6dd98aba0057bcb9e5422127af-us20",
  };

  const requestTemp = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + '/success.html');
      console.log("Successfully subscribed");
    //   res.send("Successfully subscribed");
    } else {
      res.sendFile(__dirname + '/failure.html');
      console.log("Failed to subscribe");
    //   res.send("Failed to subscribe");
    }

    response.on("data", function (data) {
      // console.log(JSON.parse(data));
    });
  });

  requestTemp.write(jsonData);
  requestTemp.end();
});


app.post("/failure", function (req, res) {
    res.redirect('/');
});

app.post("/success", function (req, res) {
    res.redirect('/');
});






app.listen(process.env.PORT || 3000 , () => {
  console.log("listening on 3000");
});

// API Key 34e7ad6dd98aba0057bcb9e5422127af-us20
// List Id 770fef9d7c
