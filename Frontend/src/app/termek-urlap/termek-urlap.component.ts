import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TermekModel } from '../termek-model';

@Component({
  selector: 'app-termek-urlap',
  templateUrl: './termek-urlap.component.html',
  styleUrls: ['./termek-urlap.component.css']
})
export class TermekUrlapComponent {
  
  public product:TermekModel;

  constructor(@Inject(MAT_DIALOG_DATA) bármi: TermekModel)
  {
    this.product = bármi;
  }
}
