import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScratchPaperComponent } from './scratch-paper.component';

describe('ScratchPaperComponent', () => {
  let component: ScratchPaperComponent;
  let fixture: ComponentFixture<ScratchPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScratchPaperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScratchPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
