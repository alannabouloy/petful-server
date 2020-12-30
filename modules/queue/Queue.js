const _Node = require('./_Node')
class Queue {
  constructor() {
    // Set initial data.
    this.first = null;
    this.last = null;
  }

  enqueue(data) {
    // Add some data to the queue.
    const node = new _Node(data);

    if(this.first === null){
      this.first = node;
    }

    if(this.last){
      this.last.next = node;
    }

    this.last = node;
  }

  dequeue() {
    // Remove some data from the queue.
    if(this.first === null){
      return;
    }

    const node = this.first;
    this.first = this.first.next;

    if(node === this.last){
      this.last = null;
    }

    return node.value;

  }

  show() {
    // Return the next item in the queue.
    return this.first.value;
  }

  all() {
    // Return all items in the queue.
    let currNode = this.first;
    const nodeArray = [];
    while(currNode){
      nodeArray.push({value: currNode.value, next: currNode.next})
      currNode = currNode.next
    }
    return nodeArray
  }
}

module.exports = Queue
