<template>
  <div>
    <button @click="changeCount">changeCount</button>
    <h2>{{count}}</h2>
  </div>
</template>

<script>
export default {

  name: "LoopExample",

  data() {
    return {
      count: 0,
    };
  },

  beforeUpdate() {
    console.log("before update");
  },

  updated() {
    console.log("updated");
  },

  methods: {
    changeCount() {
      for(let i = 1; i <= 1000; i++) {
        this.count += 1;
      }
    }
  }
}
</script>

<style>

</style>