var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email:{ type: String , unique: true },
	password:{ type: String},
});

/*
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
*/

UserSchema.methods.validPassword = function(pwd ) {
     return ( this.password == pwd  );
};

exports.User = mongoose.model('User', UserSchema);