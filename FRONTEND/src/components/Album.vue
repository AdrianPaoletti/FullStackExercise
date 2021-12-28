<template>
  <li class="album">
    <div class="album__image-container">
      <img
        :src="album.artworkUrl100"
        alt="album thumbnail"
        class="album__image"
        width="150"
      />
    </div>
    <h2 class="album__name">{{ album.collectionName }}</h2>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "Album",
  props: ["album"],
});
</script>

<style lang="scss" scoped>
.album {
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  width: 260px;
  &__name {
    font-size: 17px;
  }
}
</style>
