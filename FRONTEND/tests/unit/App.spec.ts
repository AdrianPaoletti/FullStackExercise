import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import App from "../../src/App.vue";
import AlbumsList from "../../src/views/AlbumsList.vue";
import router from "../../src/router";
import state from "../mockedState";

describe("Given an App componennt", () => {
  describe("When is rendered", () => {
    const store = createStore({
      state() {
        return state;
      },
    });

    const wrapper = mount(App, {
      global: {
        plugins: [router, store],
      },
      components: {
        AlbumsList,
      },
    });

    test("Then it should render AlbumList component", () => {
      wrapper.getComponent(AlbumsList);
    });
    test("Then it should render the div html tag, with the albums class, from the AlbumsList component", () => {
      expect(wrapper.html()).toContain('<div class="albums">');
    });
  });
});
