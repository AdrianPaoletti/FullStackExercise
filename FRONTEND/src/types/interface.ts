export interface Album {
  collectionName: string;
  artworkUrl100: string;
}

export interface State {
  albums: Array<Album>;
}
