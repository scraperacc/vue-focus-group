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
    },

    recousiveChange() {
      setTimeout(() => {
        this.count++;
      console.log(this.count)
      if (this.count >= 100) {
        return;
      }
      this.recousiveChange()
      }, 0);
    },
  }
}
</script>

<style>

</style>
