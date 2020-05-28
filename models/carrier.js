var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var carrierSchema = new Schema({
    company_name:  String
}
 );
 const Carrier=mongoose.model('carrier',carrierSchema);
 module.exports = Carrier;