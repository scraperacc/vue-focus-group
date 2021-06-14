<template>
  <div class="container">

    <div class="toolbar">
      <div>
        <button @click="removeFirstItem" >
          Remove first item
        </button>

        <button @click="removeLastItem" >
          Remove last item
        </button>

        <button @click="removeAllItems">
          Remove all items
        </button>
      </div>
   
      <div>
        <button @click="addItemToTheBeginning" >
          Add item to the beginning 
        </button>

        <button @click="addItemToTheEnd" >
          Add item to the end
        </button>
         <button @click="removeAndAddBackAllItems">
          Remove and add back all items
        </button>
      </div>

    </div>

    <ul>
      <li 
        v-for="(listItem, index) of listItems" 
        :key="index"
        >
        {{ listItem }}
      </li>
    </ul>
  </div>
</template>

<script>

export default {

  name: "DOM_Updatet",

  data() {
    return {
      listItems: [],
      time: null
    };
  },

  beforeUpdate() {
    console.log("before update");
    this.time = new Date();
  },

  updated() {
    console.log("updated");
    console.log(new Date() - this.time);
  },


  methods: {
    removeFirstItem() {
      this.listItems.shift();
    },

    removeLastItem() {
      this.listItems.pop()
    },

    addItemToTheBeginning() {
      this.listItems.unshift(`item-${this.getIndex()}`)
    },

    addItemToTheEnd() {
      this.listItems.push(`item-${this.getIndex()}`)
    },

    removeAllItems() {
      this.listItems.splice(0, this.listItems.length)
    },

    removeAndAddBackAllItems() {
      let clonnedList = [...this.listItems];

      this.removeAllItems();
      this.listItems.push(...clonnedList);
    },

    getIndex() {
      if (!this.listItems.length) {
        return 0;
      }
      let firstItemIndex = +this.listItems[0].split("-")[1];
      let lastItemIndex = +this.listItems[this.listItems.length - 1].split("-")[1];
      return firstItemIndex > lastItemIndex ? firstItemIndex + 1 : lastItemIndex + 1
    }
    
  }
}
</script>

<style >

.container {
  display: flex;
  flex: 1 1;
  flex-direction: column;
}

.toolbar > div{
  display: flex;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
}
.toolbar > div > button{
  padding: .5rem;
  background: #4fb4ff;
  color: aliceblue;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color .3s;
  margin: 0 15px;
}
.toolbar > div > button:hover {
  background: #1296f8;
}
</style>