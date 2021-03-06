export type AlbumCreateUpdateInput = {
  readonly name: string;
  released?: number;
  artistsIds?: string[];
  bandsIds?: string[];
  trackIds?: string[];
  genresIds?: string[];
  image?: string;
};
