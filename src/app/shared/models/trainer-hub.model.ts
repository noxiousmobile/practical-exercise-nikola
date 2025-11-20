import { PokemonItem } from './pokemon-item.model';

export interface TrainerHub {
  entries: PokemonItem[];
  loading: boolean;
  error: string | null;
}