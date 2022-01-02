import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFilesFormComponent } from './new-files-form.component';

describe('NewFilesFormComponent', () => {
  let component: NewFilesFormComponent;
  let fixture: ComponentFixture<NewFilesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewFilesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFilesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
