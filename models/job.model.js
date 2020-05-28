var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
   message:  String
}
 );
 const JOB=mongoose.model('job',jobSchema);
 module.exports = JOB;