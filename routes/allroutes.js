'use strict';
var mongoose = require('mongoose'),
  Person = mongoose.model('Person')
module.exports = function(app) {


/* GET home page. */
app.get('/', function(req, res, next) {
  //req.flash('info', 'This is a test notification.');
  res.render('index', {title: 'Tom and Miao Qun\'s',subtitle:'Farewell Party',messages: req.flash('info'),error: req.flash('error'),
  	greeting: 'For MQ to Update'

	})
});


app.post('/rsvp', function(req, res) {
	//console.log(req.body);
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
