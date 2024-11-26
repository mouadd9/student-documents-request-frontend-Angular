import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesNavBarComponent } from './demandes-nav-bar.component';

describe('DemandesNavBarComponent', () => {
  let component: DemandesNavBarComponent;
  let fixture: ComponentFixture<DemandesNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandesNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandesNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
