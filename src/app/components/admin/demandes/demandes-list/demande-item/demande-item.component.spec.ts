import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeItemComponent } from './demande-item.component';

describe('DemandeItemComponent', () => {
  let component: DemandeItemComponent;
  let fixture: ComponentFixture<DemandeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
