import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVideoFormComponent } from './new-video-form.component';

describe('NewVideoFormComponent', () => {
  let component: NewVideoFormComponent;
  let fixture: ComponentFixture<NewVideoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewVideoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVideoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
