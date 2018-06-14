
var User = require('../models/User').User;

exports.index = function(req, res){
    res.render('index');
}

exports.success = function(req, res){
	
	//console.log(req.session.passport);
	
    res.render('success');
}

exports.fail = function(req, res){
    res.render('fail');
}

exports.user = function(req, res){
    res.render('user');
}