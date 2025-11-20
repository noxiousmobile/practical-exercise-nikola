import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PokemonItemComponent } from '../../shared/components/pokemon-item/pokemon-item.component';
import { PokemonService } from '../../shared/services/pokemon.service';
import { PokemonItem } from '../../shared/models/pokemon-item.model';

@Component({
  selector: 'app-trainer-hub',
  standalone: true,
  imports: [PokemonItemComponent],
  templateUrl: './trainer-hub.component.html',
  styleUrls: ['./trainer-hub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainerHubComponent {
  readonly pokemons = signal<PokemonItem[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly pageSize = signal(8);
  readonly offset = signal(0);

  private readonly pokemonService = inject(PokemonService);

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.loading.set(true);
    this.error.set(null);

    this.pokemonService.getPokemonPage(this.pageSize(), this.offset()).subscribe({
      next: (res) => {
        this.pokemons.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load pokemons.');
        this.loading.set(false);
      },
    });
  }
}
