import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedStartupsComponent } from './liked-startups.component';

describe('LikedStartupsComponent', () => {
  let component: LikedStartupsComponent;
  let fixture: ComponentFixture<LikedStartupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikedStartupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedStartupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
