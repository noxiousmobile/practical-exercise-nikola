import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { PokemonItem } from '../../models/pokemon-item.model';

@Component({
  selector: 'app-pokemon-item',
  standalone: true,
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonItemComponent {
  readonly pokemon = input.required<PokemonItem>();
  readonly pokemonLoaded = signal(false);

  onPokemonLoad(): void {
    this.pokemonLoaded.set(true);
  }
}