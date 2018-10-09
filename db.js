const mongoose = require('mongoose');
//mongoose.connect('mongodb://yourMongoDBURIGoesHere');
// mongoose.connect('mongodb://localhost:27017/Biashara-1');

 //mongoose.connect('mongodb://mbanda:mbanda@ds115740.mlab.com:15740/biashara-point')

 
  mongoose.connect('mongodb://mbanda1:mbanda1@ds115740.mlab.com:15740/biashara-point', function(err, db) {
    if (err) {
        console.log('Unable to connect :', err);
    } else {
        console.log('Connected to Server successfully!');
    }
}); 
