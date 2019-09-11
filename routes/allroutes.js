'use strict';
var mongoose = require('mongoose'),
  Person = mongoose.model('Person')
module.exports = function(app) {

/* GET home page. */
app.get('/', function(req, res, next) {
  //req.flash('info', 'This is a test notification.');
  res.render('index', {title: 'Tom and Miao Qun\'s',subtitle:'Farewell Party',messages: req.flash('info'),error: req.flash('error'),
  	greeting: 'Dear friends, as you will know we are moving to Sydney. We have made many good friends over the years and are thankful to God for your friendship and support. We would love to see you a final time before we make our way down under and would be delighted if you can join us for our farewell party. The details are below; we will provide canapés and cakes but we kindly ask that you buy your own beverages. No need to bring any gifts or cards - your presence will be enough. We hope to see you there; either way, please keep in touch!'
	})
});


app.post('/rsvp', function(req, res) {
  if(req.body.firstname == '' || req.body.lastname == ''){
    req.flash('error','Please enter Firstname and Lastname');
    res.redirect('/');
  }else{
    var new_rsvp = new Person(req.body);
	  new_rsvp.save(function(err,person){
	   if(err)
      req.flash('error','Sorry there was an error, please try again');
     req.flash('info', 'Thanks for your RSVP, see you soon!');
     res.redirect('/');
	    });
    };
});


app.get('/attending', function(req,res,next){
async.parallel([

  //Read sheets data from Sheets
  function(callback) {
    var query = Person.countDocuments({attending: '1'});
    query.exec(function(err, attending) {
      if (err) {
          callback(err);
        }

        callback(null, attending);
      });
  },

  //Read friends data from Friends
  function(callback) {
    var query = Person.countDocuments({attending: '0'});
    query.exec(function(err, notattending) {
      if (err) {
          callback(err);
        }

        callback(null, notattending);
      });
  }
],

//Compute all results
function(err, results) {
  if (err) {
    console.log(err);
    return res.send(400);
  }

  if (results == null || results[0] == null) {
    return res.send(400);
  }

  //results contains [sheets, Friends, Expenses]
  console.log(results);
  var personData = {name: results[0], name: results[1]};
  personData.attending = results[0] || [];
  personData.notattending = results[1] || [];
  res.render('attending', {attending: personData.attending,notattending: personData.notattending,messages: req.flash('info'),error: req.flash('error')})

});

});
};