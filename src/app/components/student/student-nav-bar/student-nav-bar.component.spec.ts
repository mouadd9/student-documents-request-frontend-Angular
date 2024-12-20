import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNavBarComponent } from './student-nav-bar.component';

describe('StudentNavBarComponent', () => {
  let component: StudentNavBarComponent;
  let fixture: ComponentFixture<StudentNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
