import axios from "axios";
import { Commit } from "vuex";
import configActionContext from "../test-utils";
import { actions } from "../../src/store/index";
import { Album } from "@/types/interface";
import mockedState from "../mockedState";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const commit = jest.fn() as jest.MockedFunction<Commit>;

describe("Given a loadAlbums action", () => {
  describe("When the action is invoked", () => {
    test("Then it should call commit with loadAlbums and receive the albums", async () => {
      const data: Array<Album> = mockedState.albums;
      mockedAxios.get.mockResolvedValue({ data });

      await actions.loadAlbums(configActionContext(commit));
      expect(commit).toHaveBeenCalled();
      expect(commit).toHaveBeenCalledWith("loadAlbums", data);
    });
  });
});
