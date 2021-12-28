import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import Album from "../../src/components/Album.vue";
import router from "../../src/router";
import state from "../mockedState";

describe("Given an Album componennt", () => {
  describe("When is rendered", () => {
    test("Then it should render the div html tag, with the 'album__image-container' class", async () => {
      const store = createStore({
        state() {
          return state;
        },
      });

      const wrapper = mount(Album, {
        global: {
          plugins: [router, store],
        },
        data() {
          return {
            album: state.album,
          };
        },
      });

      expect(wrapper.html()).toContain('<div class="album__image-container">');
    });
  });
});
