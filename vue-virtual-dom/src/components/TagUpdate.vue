<template>
  <div >
    <button @click="content = !content"> Change content </button>
    <button @click="logTag"> log block </button>
<!-- 
    <div class="class1" v-if="content">
       content 1 

    </div>
    <div class="class2 class3" v-else>
      
       content 2 
      
    </div> -->
    <div class="class1" id="my-block" v-if="content">
      
       <h1>content 1 </h1>
      
    </div>
    <div class="class2 class3" v-else>
       <h1>content 2 </h1>
    </div>

  </div>
</template>

<script>

export default {

  name: "TagUpdate",

  data() {
    return {
      content: true,
      block: null
    };
  },

  mounted() {
    this.block = document.getElementById("my-block");
  },

  methods: {
    logTag() {
      console.log("has the block changed completely", this.block === document.getElementsByClassName(this.content ? "class1" : "class2")[0])
    }
  }
};
</script>

<style>

</style>
