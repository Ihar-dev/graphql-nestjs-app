export type TrackCreateUpdateInput = {
  readonly title: string;
  readonly albumId: string;
  bandsIds?: string[];
  readonly artistsIds: string[];
  readonly duration: number;
  readonly released: number;
  readonly genresIds: string[];
};
