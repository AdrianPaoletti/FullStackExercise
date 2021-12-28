<template>
  <div class="albums">
    <h1 class="albums__title">List of albums</h1>
    <SearchBox
      :albums="albums"
      @albumsFiltered="updateAlbums"
      class="albums__search-box"
    />
    <ul class="albums__container">
      <Album
        v-for="album in filteredAlbums === '' ? albums : filteredAlbums"
        :key="album.collectionId"
        :album="album"
      />
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapState } from "vuex";
import Album from "../components/Album.vue";
import SearchBox from "../components/SearchBox.vue";

export default defineComponent({
  name: "AlbumsList",
  data() {
    return {
      filteredAlbums: "",
    };
  },
  components: {
    Album,
    SearchBox,
  },
  computed: {
    ...mapState(["albums"]),
  },
  methods: {
    ...mapActions(["loadAlbums"]),

    updateAlbums(albums) {
      this.filteredAlbums = albums;
    },
  },
  mounted() {
    this.loadAlbums();
  },
});
</script>

<style lang="scss" scoped>
.albums {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto;
    grid-row-gap: 15px;
    padding-left: 0;
    margin-top: 40px;
  }
}
</style>
