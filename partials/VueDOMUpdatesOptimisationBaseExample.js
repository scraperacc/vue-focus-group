const data = {

  _name: "valod",

  get name() {
    return this.name;
  },    
  set name(val) {

    console.log("set value ", val)
    
    this._name = val;

      this.addCallbackInQueue({
        id: "name",
        cb() {
          console.log("**********print from callback***********");
          console.log( `value on last operation is : ${val}`)
        }    
      })
  },

  addCallbackInQueue(callback) {
    console.log("add callback in queue", callback)
    const existingCallback = this.callbackQueue.find(el => el.id === callback.id);
    
    if (existingCallback) {
      const index = this.callbackQueue.indexOf(existingCallback);
      this.callbackQueue[index] = callback
    }
    else {
      this.callbackQueue.push(callback);
    }

    if (!this.isCallbacksInTheQueueAreRunning) {
      console.log("runing callbacks in queue")
      this.runCallbacksInQueue();
    }
  },

  runCallbacksInQueue() {

    console.log("callbacks in queue is runed")
    this.isCallbacksInTheQueueAreRunning = true;

    setTimeout(() => {
      
      const copies = this.callbackQueue.slice(0);
      this.callbackQueue.length = 0;
      copies.forEach(watcher => watcher.cb());
      this.isCallbacksInTheQueueAreRunning = false;

    }, 0);
  },

  isCallbacksInTheQueueAreRunning: false,

  callbackQueue: []
}

function changeValue() {
  for(let i = 0; i < 10; i++) {
      data.name = `name - ${i}`
  }
}