import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainerHubComponent } from './trainer-hub.component';

describe('TrainerHub', () => {
  let component: TrainerHubComponent;
  let fixture: ComponentFixture<TrainerHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerHubComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
