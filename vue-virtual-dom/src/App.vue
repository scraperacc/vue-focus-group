git branch -M main<template>
  <div id="app">
    <!-- <DOMUpdates /> -->
    <!-- <TagUpdate /> -->
    <LoopExample />
  </div>
</template>

<script>
// import DOMUpdates from './components/DOMUpdatesWidthArray.vue';
// import DOMUpdates from './components/DOMUpdatesWidthString.vue';
// import TagUpdate from "./components/TagUpdate.vue";
// import compile_ from "./compile";
import LoopExample from "./components/LoopExample.vue";

export default {

  name: 'App',

  components: { 
    // DOMUpdates,
    // TagUpdate,
    LoopExample
    },

  mounted() {
  //   console.log(compile_())
    // console.log(this._vnode)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
