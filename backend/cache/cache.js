const Promise = require("bluebird");
const Node = require("./node");

module.exports = class ProcessCache {
  
  constructor(process, limit) {
    this.process = process;
    this.limit = limit;
    this._initCache();
  }

  _initCache() {
    this.cache = {};
    this.size = 0;
    this.tail = null;
    this.head = null;
  }

  _parseKey(key) {
    if(typeof key === "string") return key;
    return JSON.stringify(key);
  }

  _removeNode(node) {
    if(node.prev !== null)
      node.prev.next = node.next;
    else
      this.head = node.next;

    if(node.next !== null)
      node.next.prev = node.prev;
    else
      this.tail = node.prev;
  }

  remove(key) {
    key = this._parseKey(key);
    const node = this.cache[key];

    this._removeNode(node);

    delete this.cache[key];
    this.size--;
  }

  get(key) {
    key = this._parseKey(key);
    const cachedData = this.cache[key];
    //console.log(key, cachedData)
    if(cachedData) {
      // So it is reseted as the head of the linked list
      this.remove(key);
      this.add(key, cachedData.value);
      return cachedData.value;
    }
    return null;
  }

  add(key, value) {
    key = this._parseKey(key);

    if(this.size === this.limit) 
      this.remove(this.tail.key);

    if(this.head) {
      const node = new Node(key, value, this.head);
      this.head.prev = node;
      this.head = node;
    }
    else
      this.head = this.tail = new Node(key, value);

    this.cache[key] = this.head;
    this.size++;
  }

  // I assumed that it would be better to return the result of this method as a promise.
  execute(...args) {
    const cachedValue = this.get(args);
    if(cachedValue) return Promise.resolve(cachedValue);

    return Promise.method(() => this.process(...args))()
    .tap(value => this.add(args, value));
  }

}
