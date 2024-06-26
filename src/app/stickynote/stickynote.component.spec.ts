import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyNoteComponent } from './stickynote.component';

describe('StickyNoteComponent', () => {
  let component: StickyNoteComponent;
  let fixture: ComponentFixture<StickyNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StickyNoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StickyNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
