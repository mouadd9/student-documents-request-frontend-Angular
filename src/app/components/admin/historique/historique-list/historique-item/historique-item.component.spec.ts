import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueItemComponent } from './historique-item.component';

describe('HistoriqueItemComponent', () => {
  let component: HistoriqueItemComponent;
  let fixture: ComponentFixture<HistoriqueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriqueItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoriqueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
