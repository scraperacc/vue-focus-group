git branch -M main<template>
  <div id="app" class="i_am_in_data_property_o_Vnode" :class="{ 'class__name': isActiveClass }">
    <!-- <DOMUpdates /> -->
    <!-- <TagUpdate /> -->
    <!-- <LoopExample /> -->
    <!-- <AsyncronUpdateExample /> -->
    <ImpactOfChangesOnChildren />
  </div>
</template>

<script>
import ImpactOfChangesOnChildren from "./components/ImpactOfChangesOnChildren.vue";
// import AsyncronUpdateExample from "./components/AsyncronUpdateExample.vue"
// import DOMUpdates from './components/DOMUpdatesWidthString.vue';
// import DOMUpdates from './components/DOMUpdatesWidthArray.vue';
// import LoopExample from "./components/LoopExample.vue";
// import TagUpdate from "./components/TagUpdate.vue";
// import compile_ from "./compile";


export default {

  name: 'App',

  data() {
    return {
      isActiveClass: false,
    }
  },

  components: { 
    // DOMUpdates
    // TagUpdate
    // LoopExample
    // AsyncronUpdateExample
    ImpactOfChangesOnChildren
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
