const axios = require("axios");
const getArtistAlbums = require("./artistController");

jest.mock("axios");

const albums = {
  data: {
    results: [
      {
        collectionName: "An Evening With Silk Sonic",
        artworkUrl100: "https://is2-ssl.mzstatic.com/image.jpg",
      },
      {
        collectionName: "Malibu",
        artworkUrl100: "https://is2-ssl.mzstatic.com/image.jpg",
      },
      {
        collectionName: "Back in black",
        artworkUrl100: "https://is2-ssl.mzstatic.com/image.jpg",
      },
    ],
  },
};

describe("Given a getArtistAlbums function", () => {
  describe("When it's invoked and API call is successful", () => {
    test("Then it should respond with the artist's albums", async () => {
      axios.get.mockResolvedValue(albums);
      const res = { json: jest.fn() };

      await getArtistAlbums(null, res, null);

      expect(res.json).toHaveBeenCalledWith(albums.data.results);
      expect(axios.get).toHaveBeenCalledWith(
        "https://itunes.apple.com/search?term=anderson+paak&media=music&entity=album"
      );
    });
  });

  describe("When it's invoked and API call resolves to a falsy value", () => {
    test("Then it should call next function with the a 404 error code and message", async () => {
      const albumsFalsy = { data: null };
      axios.get.mockResolvedValue(albumsFalsy);
      const next = jest.fn();
      const expectedError = new Error("Could not find artist");
      expectedError.code = 404;

      await getArtistAlbums(null, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });

  describe("When it's invoked and API call fails", () => {
    test("Then it should call next function with the a 400 error code and message", async () => {
      axios.get.mockRejectedValue({});
      const next = jest.fn();
      const expectedError = new Error("Could not search the artist's albums");
      expectedError.code = 400;

      await getArtistAlbums(null, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});
