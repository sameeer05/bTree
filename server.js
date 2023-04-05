const express = require('express')
const mongoose = require('mongoose')
const NodeModel = require('./nodeModel')

const app = express()

// Connect Mongoose
mongoose.connect('mongodb://0.0.0.0:27017/bTree', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error)

// function to add a new node
async function addNode(parentId, value, isLeftChild) {
    const newNode = new NodeModel({ value });
    const parent = await NodeModel.findById(parentId);
  
    if (isLeftChild) {
      newNode.parent = parentId;
      parent.left = newNode._id;
    } else {
      newNode.parent = parentId;
      parent.right = newNode._id;
    }
  
    await newNode.save();
    await parent.save();
  }

addNode('642d560c3ed1c7f572a6d3d9', 9, true)

// Route to start bfs
app.get('/bfs/:nodeId', async (req, res) => {
  const startNodeId = req.params.nodeId
  const queue = [startNodeId]
  const visitedNodes = new Set()
  
  while (queue.length > 0) {
    const nodeId = queue.shift();
    if (visitedNodes.has(nodeId)) {
      continue;
    }
    const node = await NodeModel.findById(nodeId);
    if (!node) {
      continue;
    }
    visitedNodes.add(nodeId);
    console.log(node.value);
    queue.push(node.left, node.right);
  }
  
  res.status(200).send('Breadth-first search complete.');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
