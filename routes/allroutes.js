'use strict';
module.exports = function(app) {


/* GET home page. */
app.get('/', function(req, res, next) {
  res.render('index', {title: 'Tom and Miao Qun\'s',subtitle:'Farewell Party' });
});
}