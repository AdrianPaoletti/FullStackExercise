<template>
  <AlbumsList />
</template>

<script>
import { defineComponent } from "vue";
import AlbumsList from "./views/AlbumsList.vue";

export default {
  components: {
    AlbumsList,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
