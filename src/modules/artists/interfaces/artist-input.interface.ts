export type ArtistCreateUpdateInput = {
  readonly firstName: string;
  readonly secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  readonly country: string;
  bandsIds?: string[];
  instruments?: string[];
};
