import { MemberInput } from './member-input.interface';

export type BandCreateUpdateInput = {
  name: string;
  origin?: string;
  members?: MemberInput[];
  website?: string;
  genresIds?: string[];
};
