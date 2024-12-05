import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueNavBarComponent } from './historique-nav-bar.component';

describe('HistoriqueNavBarComponent', () => {
  let component: HistoriqueNavBarComponent;
  let fixture: ComponentFixture<HistoriqueNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
