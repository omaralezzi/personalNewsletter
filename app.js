const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// use static to plblic css and images folder inside public folder
app.use(express.static('public'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/signup.html');
});


app.post('/', function(req, res) {
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.email;

    console.log(firstName, lastName, email);
    res.send('Thank you for signing up, ' + firstName + ' ' + lastName);
   
});




app.listen(3000, () => {
    console.log('listening on 3000');
}
);
