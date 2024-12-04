import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationsNavBarComponent } from './reclamations-nav-bar.component';

describe('ReclamationsNavBarComponent', () => {
  let component: ReclamationsNavBarComponent;
  let fixture: ComponentFixture<ReclamationsNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReclamationsNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationsNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
