import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekListaComponent } from './termek-lista.component';

describe('TermekListaComponent', () => {
  let component: TermekListaComponent;
  let fixture: ComponentFixture<TermekListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermekListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermekListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
