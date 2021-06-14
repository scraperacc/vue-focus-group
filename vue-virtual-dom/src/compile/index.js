import { compile } from "vue-template-compiler";

const template = `
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
</div>`;

export default function compile_ () {
  return compile(template);
}