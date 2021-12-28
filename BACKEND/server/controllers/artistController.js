const axios = require("axios");

const getArtistAlbums = async (req, res, next) => {
  try {
    const { data: artistAlbums } = await axios.get(
      "https://itunes.apple.com/search?term=anderson+paak&media=music&entity=album"
    );
    if (artistAlbums) {
      const uniqueAlbums = artistAlbums.results.filter(
        (albumFiltered, index, albums) =>
          index ===
          albums.findIndex(
            (album) => album.collectionName === albumFiltered.collectionName
          )
      );
      return res.json(uniqueAlbums);
    }

    const error = new Error("Could not find artist");
    error.code = 404;
    next(error);
  } catch (error) {
    error.code = 400;
    error.message = "Could not search the artist's albums";
    next(error);
  }
};

module.exports = getArtistAlbums;
