var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lobSchema = new Schema({
   category_name:  String
}
 );
 const LOB=mongoose.model('lob',lobSchema);
 module.exports = LOB;