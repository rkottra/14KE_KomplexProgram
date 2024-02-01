import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from '../models/product-model';

@Component({
  selector: 'app-termek-urlap',
  templateUrl: './termek-urlap.component.html',
  styleUrls: ['./termek-urlap.component.css']
})
export class TermekUrlapComponent {
  
  public product:ProductModel;

  constructor(@Inject(MAT_DIALOG_DATA) bármi: ProductModel)
  {
    this.product = bármi;
  }
}
