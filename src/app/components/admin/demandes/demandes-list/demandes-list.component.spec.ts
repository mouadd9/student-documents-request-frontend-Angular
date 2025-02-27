import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandesListComponent } from './demandes-list.component';

describe('DemandesListComponent', () => {
  let component: DemandesListComponent;
  let fixture: ComponentFixture<DemandesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
