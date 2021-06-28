<template>
  <div>
    <button @click="updateAndLogValue">Click me</button>
    <h1 ref="h">{{value}}</h1>
  </div>
</template>

<script>
export default {
  name: "AsyncronUpdateExample",

  data() {
    return {
      value: "value"
    };
  },

  methods: {
    updateAndLogValue() {
      this.value = this.value === "value" ? "new value" : "value";
      console.log(this.$refs.h.innerText)
    }
  }
}
</script>

<style scoped >
button {
  margin: 20px auto
}
</style>