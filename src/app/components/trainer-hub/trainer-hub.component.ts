import { ChangeDetectionStrategy, Component, inject, signal, HostListener, computed } from '@angular/core';
import { PokemonItemComponent } from '../../shared/components/pokemon-item/pokemon-item.component';
import { PokemonService } from '../../shared/services/pokemon.service';
import { PokemonItem } from '../../shared/models/pokemon-item.model';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-trainer-hub',
  standalone: true,
  imports: [PokemonItemComponent],
  templateUrl: './trainer-hub.component.html',
  styleUrls: ['./trainer-hub.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainerHubComponent {
  private readonly pokemonService = inject(PokemonService);
  readonly pokemons = signal<PokemonItem[]>([]);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);
  readonly pageSize = signal(8);
  readonly offset = signal(0);
  readonly chunkSize = 12;
  readonly maxChunkSize = 100;
  readonly loadingInitial = signal<boolean>(true);
  readonly loadingMore = signal<boolean>(false);
  readonly isAllLoaded = computed(
    () => this.pageSize() > 0 && this.pokemons().length >= this.pageSize()
  );
  private currentRequest?: Subscription;
  private isFetching = false;


  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.isFetching || this.isAllLoaded()) return;

    const threshold = 300;
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;

    if (scrollPosition + threshold >= pageHeight) {
      this.loadPokemonData(false);
    }
  }


  ngOnInit(): void {
    this.loadPokemonData();
  }

  private loadPokemonData(initial = false): void {
    if (this.isFetching || this.isAllLoaded()) return;

    this.isFetching = true;
    this.error.set(null);

    if (initial) {
      this.loadingInitial.set(true);
    } else {
      this.loadingMore.set(true);
    }

    const limit = Math.min(this.chunkSize, this.maxChunkSize);
    const currentOffset = this.offset();

    this.currentRequest?.unsubscribe();

    this.currentRequest = this.pokemonService
      .getPokemonPage(limit, currentOffset)
      .pipe(
        finalize(() => {
          this.isFetching = false;
          if (initial) {
            this.loadingInitial.set(false);
          } else {
            this.loadingMore.set(false);
          }
        })
      )
      .subscribe({
        next: (res: any) => {
          this.pageSize.set(res.count);
          this.pokemons.update((current) => [...current, ...res]);
          this.offset.update((v) => v + limit);
        },
        error: (err: any) => {
          this.error.set(err);
        },
      });
  }

}
