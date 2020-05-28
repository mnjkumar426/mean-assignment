var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var policySchema = new Schema({
    policy_number:  String,
    policy_start_date:Date,
    policy_end_date:Date,
    lob:{type: Schema.Types.ObjectId, ref: 'lob'},
    carrier:{type: Schema.Types.ObjectId, ref: 'carrier'},
    user:{type: Schema.Types.ObjectId, ref: 'user'},
    agent:{type: Schema.Types.ObjectId, ref: 'agent'}
      

}
 );
 const Policy=mongoose.model('policy',policySchema);
 module.exports = Policy;