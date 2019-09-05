'use strict';
module.exports = function(app) {


/* GET home page. */
app.get('/', function(req, res, next) {
  //req.flash('info', 'This is a test notification.');
  res.render('index', {title: 'Tom and Miao Qun\'s',subtitle:'Farewell Party',messages: req.flash('info')})
});


app.post('/rsvp', function(req, res) {
	console.log(req.body);
	req.flash('info', 'Thanks for your RSVP, see you soon!');
	res.redirect('/');
});



}