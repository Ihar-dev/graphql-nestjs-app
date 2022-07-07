import { MemberInput } from './member-input.interface';

export type BandInput = {
  name: string;
  origin?: string;
  members?: MemberInput[];
  website?: string;
  genresIds?: string[];
};
