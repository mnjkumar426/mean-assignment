var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstname:  String,
    email:String,
    dob:Date,
    address:String,
    phone:String,
    state:String,
    zip:String,
    gender:{
        type: String,
        enum : ['Male','Female',''],
        default: '' 
    },
    userType: {
        type: String,
        enum : ['Active Client'],
        default: 'Active Client'
    },

}
 );
 const User=mongoose.model('user',UserSchema);
 module.exports = User;