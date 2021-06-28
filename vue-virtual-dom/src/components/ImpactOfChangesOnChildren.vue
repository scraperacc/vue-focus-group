<template>
  <div>
    <button @click="toggle">
      Click Me
    </button>

    <ul class="container" v-if="showFirsrComponent" ref="content1">
      <div class="block2">Block One</div>
      <div class="block3">Block Two</div>
    </ul>

    <div class="container" v-else ref="content1">
      <div class="block2">Block One</div>
      <div class="block3">Block Two</div>
    </div>
  </div>

</template>

<script>
export default {
  name: "ImpactOfChangesOnChildren",

  data() {
    return {
      showFirsrComponent: true
    };
  },

  methods: {
    toggle() {
      this.showFirsrComponent = !this.showFirsrComponent;
      const {content1} = this.$refs;
      console.log(`tagname is ${content1.tagName}`);
      console.log('child elements is ', content1.children);
      setTimeout(() => {
        console.log(`tagname is ${this.$refs.content1.tagName}`);
        console.log('child elements is ', this.$refs.content1.children);
        console.log('is childs equal', this.$refs.content1.children[0] === content1.children[0]);
      });
    }
  }

}
</script>

<style scoped>

.container {
  width: 300px;
  height: 300px;
  margin: 50px auto;
  border: solid 1px dimgray;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  list-style: none;
  padding: 0;
}
.container > * {
  padding: 15px;
  background: chartreuse;
}
</style>