import { schema } from 'normalizr';

export const Movie = new schema.Entity('movie');
export const Movies = [Movie];