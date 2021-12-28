import { createStore, ActionContext } from "vuex";
import axios from "axios";
import { State, Album } from "@/types/interface";

const urlAlbums = "http://localhost:3000/music/artist";

const mutations = {
  loadAlbums(state: State, payload: Array<Album>): void {
    state.albums = payload;
  },
};

const actions = {
  async loadAlbums({
    commit,
  }: ActionContext<State, State>): Promise<void | string> {
    const { data: albums } = await axios.get(urlAlbums);
    commit("loadAlbums", albums);
  },
};

export default createStore<State>({
  state: {
    albums: [],
  },
  mutations,
  actions,
  modules: {},
});

export { mutations, actions };
