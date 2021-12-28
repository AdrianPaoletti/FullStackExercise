<template>
  <label class="search-box" for="search-box">
    <input
      class="search-box__input"
      type="text"
      v-on:input="filterAlbums"
      v-model="searchText"
      placeholder="Type here to search album"
      id="search-box"
    />
  </label>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchBox",
  props: ["albums"],
  data() {
    return {
      searchText: "",
      filteredAlbums: "",
    };
  },
  methods: {
    filterAlbums() {
      if (this.filteredAlbums !== "") {
        this.filteredAlbums = this.albums.filter((album) =>
          album.collectionName
            .toLowerCase()
            .includes(this.searchText.trim().toLowerCase())
        );
      } else {
        this.filteredAlbums = this.albums;
      }
      this.$emit("albumsFiltered", this.filteredAlbums);
    },
  },
});
</script>

<style lang="scss" scoped>
.search-box {
  margin-top: 20px;
  &__input {
    font-size: 15px;
    border: none;
    border-bottom: 1px solid gray;
    &:focus {
      outline: none;
      border-bottom: 2px solid black;
    }
  }
}
</style>
