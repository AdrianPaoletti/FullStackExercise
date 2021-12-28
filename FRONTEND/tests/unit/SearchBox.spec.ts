import { createStore } from "vuex";
import { mount } from "@vue/test-utils";
import SearchBox from "../../src/components/SearchBox.vue";
import router from "../../src/router";
import state from "../mockedState";

describe("Given a SearchBox componennt", () => {
  const store = createStore({
    state() {
      return state;
    },
  });

  describe("When is rendered", () => {
    test("Then it should render the label html tag, with the 'search-box' class", async () => {
      const wrapper = mount(SearchBox, {
        global: {
          plugins: [router, store],
        },
        data() {
          return {
            albums: state.albums,
          };
        },
      });

      expect(wrapper.html()).toContain(
        '<label class="search-box" for="search-box">'
      );
    });
  });

  describe("When the value of the input changes and filteredAlbums is not empty", () => {
    test("Then it should call filterAlbums function", () => {
      const wrapper = mount(SearchBox, {
        global: {
          plugins: [router, store],
        },
        data() {
          return {
            albums: state.albums,
            filteredAlbums: "black",
          };
        },
      });
      const inputElement = wrapper.find("input");
      const filterAlbums = jest.fn();

      inputElement.trigger("input");
      filterAlbums();

      expect(filterAlbums).toHaveBeenCalled();
    });
  });

  describe("When the value of the input changes and filteredAlbums is empty", () => {
    test("Then it should call filterAlbums function", () => {
      const wrapper = mount(SearchBox, {
        global: {
          plugins: [router, store],
        },
        data() {
          return {
            albums: state.albums,
            filteredAlbums: "",
          };
        },
      });
      const inputElement = wrapper.find("input");
      const filterAlbums = jest.fn();

      inputElement.trigger("input");
      filterAlbums();

      expect(filterAlbums).toHaveBeenCalled();
    });
  });
});
