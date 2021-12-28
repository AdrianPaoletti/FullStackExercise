import { mutations } from "../../src/store/index";
import { Album, State } from "@/types/interface";
import mockedState from "../mockedState";

describe("Given a store mutations object", () => {
  describe("When loadAlbums is invoke with a state and payload", () => {
    test("Then it should add the albums in the state", () => {
      const state: State = mockedState;
      const payload: Array<Album> = mockedState.albums;

      mutations.loadAlbums(state, payload);

      expect(state.albums).toEqual([...payload]);
    });
  });
});
