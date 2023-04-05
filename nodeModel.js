const mongoose = require('mongoose');

const nodeSchema = new mongoose.Schema({
  value: Number,
  left: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  right: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }
});

const Node = mongoose.model('Node', nodeSchema);

module.exports = Node;
