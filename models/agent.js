var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var agentSchema = new Schema({
  agent:  String
}
 );
 const Agent=mongoose.model('agent',agentSchema);
 module.exports = Agent;