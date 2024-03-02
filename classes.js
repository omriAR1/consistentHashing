class server {

  constructor(value) {
    this.value = value;
    this.assignedItems = [];
  }

  assignItem(item) {
    this.assignedItems.push(item);
  }

  getLoad() {return this.assignedItems.length;}
}

class virtualServer {

  constructor(physicalServer, value) {
    this.server = physicalServer;
    this.value = value;
    this.assignedItems = this.server.assignedItems;
  }

  assignItem(item) {
    this.server.assignItem(item);
  }

  getLoad() {return this.server.getLoad();}

}

module.exports = {
  server,
  virtualServer,
};