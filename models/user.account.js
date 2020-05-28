var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var acountSchema = new Schema({
  account_name:  String
}
 );
 const UserAcount=mongoose.model('user_account',acountSchema);
 module.exports = UserAcount;