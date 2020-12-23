/** Part 1 */

function day23(input) {
  for (var move = 0; move < 100; move++) {
    // Use first item as current
    var current = input[0];
    // Grab next three
    var pickedUp = input.substr(1, 3);
    // Move current to the end
    input = input.substr(4) + current;
    // Find where to insert the rest
    var destination = Number(current) - 1;
    if (destination < 1) {
      destination = 9;
    }
    while (!stringContains(input, String(destination))) {
      destination--;
      if (destination < 1) {
        destination = 9;
      }
    }
    input =
        input.substr(0, input.indexOf(String(destination)) + 1)
            + pickedUp
            + input.substr(input.indexOf(String(destination)) + 1);
  }
  console.log(input);
}

/** Part 2 */

var MAX_VAL = 1000000;
var MOVES = 10000000;
var ADD_TO_ONE_MILLION = true;
//var MAX_VAL = 9;
//var MOVES = 100;
//var ADD_TO_ONE_MILLION = false;

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

function day23(input) {
  var nodes = {};
  var linkedList = new LinkedList();
  for (var i = 0; i < input.length; i++) {
    linkedList.addAtEnd(input[i]);
    nodes[input[i]] = linkedList.tail;
  }
  if (ADD_TO_ONE_MILLION) {
    for (var i = 10; i <= 1000000; i++) {
      linkedList.addAtEnd(i);
      nodes[i] = linkedList.tail;
    }
  }
  for (var move = 0; move < MOVES; move++) {
    // Use first item as current
    var current = linkedList.head;
    // Grab next three
    var pickedUpStart = linkedList.head.next;
    current.next = current.next.next.next.next; // Ignore next three in canonical list
    current.next.prev = current;
    pickedUpStart.next.next.next = null;
    pickedUpStart.prev = null;
    // Move current to the end
    linkedList.head = linkedList.head.next;
    linkedList.tail = linkedList.tail.next;
    // Find where to insert the rest
    var destination = current.val - 1;
    if (destination < 1) {
      destination = MAX_VAL;
    }
    while (pickedUpStart.val === destination || pickedUpStart.next.val === destination || pickedUpStart.next.next.val === destination) {
      destination--;
      if (destination < 1) {
        destination = MAX_VAL;
      }
    }
    var foundNode = nodes[destination];
    var nodeAfterFoundNode = foundNode.next;
    foundNode.next = pickedUpStart;
    pickedUpStart.prev = foundNode;
    pickedUpStart.next.next.next = nodeAfterFoundNode;
    nodeAfterFoundNode.prev = pickedUpStart.next.next;
  }
  var oneNode = linkedList.findNode(1);
  console.log(oneNode.next.val + " * " + oneNode.next.next.val + " = " + (oneNode.next.val * oneNode.next.next.val));
}

/** ========== Helper functions ========== */
// Arrays -- Also remember concat(array), slice( [start,end) ), and splice(index, numToRemove, itemsToAdd...)
function arrayContains(inputArr, val) { return inputArr.indexOf(val) !== -1; }
function arrayIntersection(array1, array2) { return array1.filter(value => array2.includes(value)); }
function removeItemFromArray(inputArr, val) { if (arrayContains(inputArr, val)) { inputArr.splice(inputArr.indexOf(val), 1); } }
// Strings
function replaceCharAt(inputStr, index, character) { return inputStr.substr(0, index) + character + inputStr.substr(index + 1); }
function stringContains(inputStr, subStr) { return inputStr.indexOf(subStr) !== -1; }
// Binary
function bin2dec(bin) { return parseInt(bin, 2); }
function dec2bin(dec) { return (dec >>> 0).toString(2); }
// Other
function deepCopy(input) { return JSON.parse(JSON.stringify(input)); }
/** ====================================== */

day23([3,8,9,1,2,5,4,6,7]);
day23([3,1,5,6,7,9,8,2,4]);
