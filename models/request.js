// models/Request.js
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: String,
  type:String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
  assignedWaste:{
    type:String,
    default:null,
  }
});

module.exports = mongoose.model('Request', requestSchema);
