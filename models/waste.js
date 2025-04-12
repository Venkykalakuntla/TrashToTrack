// models/Waste.js
const mongoose = require('mongoose');

const WasteSchema = new mongoose.Schema({
  type: String,
  quantity: Number,
  location: String,
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Request', default: null } // Optional link to a company request
}, { timestamps: true });

module.exports = mongoose.model('Waste', WasteSchema);
