class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}
LinkedList.prototype.addAtEnd = function(val) {
  var node = new Node(val);
  if (this.head == null) {
    this.head = node;
    this.tail = node;
    node.prev = node;
    node.next = node;
  } else {
    this.head.prev = node;
    this.tail.next = node;
    node.next = this.head;
    node.prev = this.tail;
    this.tail = node;
  }
}
LinkedList.prototype.findNode = function(val) {
  if (this.head.val === val) {
    return this.head;
  }
  var nextNode = this.head.next;
  while (nextNode.val !== this.head.val) {
    if (nextNode.val === val) {
      return nextNode;
    }
    nextNode = nextNode.next;
  }
  // Not found
  return null;
}
LinkedList.prototype.findNodeBackwards = function(val) {
  if (this.tail.val === val) {
    return this.tail;
  }
  var prevNode = this.tail.prev;
  while (prevNode.val !== this.tail.val) {
    if (prevNode.val === val) {
      return prevNode;
    }
    prevNode = prevNode.prev;
  }
  // Not found
  return null;
}
LinkedList.prototype.print = function() {
  var result = [];
  var currNode = this.head;
  while (currNode.val !== this.tail.val) {
    result.push(currNode.val);
    currNode = currNode.next;
  }
  result.push(this.tail.val);
  return result;
}
