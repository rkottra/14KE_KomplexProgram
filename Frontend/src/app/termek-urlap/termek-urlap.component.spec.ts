import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekUrlapComponent } from './termek-urlap.component';

describe('TermekUrlapComponent', () => {
  let component: TermekUrlapComponent;
  let fixture: ComponentFixture<TermekUrlapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermekUrlapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermekUrlapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
