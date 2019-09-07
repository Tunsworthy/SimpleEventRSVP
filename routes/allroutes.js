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
	var new_rsvp = new Person(req.body);
		new_rsvp.validate(function(err,person){
            if(err){
            	console.log(err._message);
            	req.flash('error','Sorry, there was an error - ' + err._message + ' Please enter Firstname and Lastname');
            	res.redirect('/');
            }else{
	        new_rsvp.save(function(err,person){
	        	req.flash('info', 'Thanks for your RSVP, see you soon!');
				res.redirect('/');
	        });	
	    };
          });


});


}
