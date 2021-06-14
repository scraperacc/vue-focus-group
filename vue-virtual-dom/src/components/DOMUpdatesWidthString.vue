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
        <button @click="logItems">
          Log Item List
        </button>
      </div>

    </div>
    <p>{{listItems}}</p>
  </div>
</template>

<script>

export default {

  name: "DOM_Updatet",

  data() {
    return {
      listItems: "",
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
      let firstElement = this.listItems.split(" ")[0];
      this.listItems = this.listItems.replace(`${firstElement} `, "");
    },

    removeLastItem() {
      let itemsArray = this.listItems.split(" ");
      let lastElement = itemsArray[itemsArray.length - 1];
      console.log(lastElement, this.listItems);
      this.listItems.replaceAll(` ${lastElement}`, "");
    },

    addItemToTheBeginning() {
      this.listItems = `item-${this.getIndex()} ${this.listItems}`  ;
    },

    addItemToTheEnd() {
      if (!this.listItems.length) {
        this.listItems = `item-${this.getIndex()}`;
        return;
      }
      this.listItems = `${this.listItems} item-${this.getIndex()}`;
    },

    removeAllItems() {
      this.listItems = "";
    },

    removeAndAddBackAllItems() {
      let clonnedList = this.listItems;

      this.removeAllItems();
      this.listItems = clonnedList;
    },

    logItems() {
      console.log(this.listItems)
    },

    getIndex() {
      if (!this.listItems.length) {
        return 0;
      }
      let listItemsArray = this.listItems.split(" ");
      listItemsArray = listItemsArray.filter(el => el);
      if (listItemsArray.length === 1) {
        return 1;
      }
      let firstItemIndex = +listItemsArray[0].split("-")[1];
      let lastItemIndex = +listItemsArray[listItemsArray.length - 1].split("-")[1];
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