import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryModel } from '../models/category-model';
import { ProductModel } from '../models/product-model';
import { TermekService } from '../services/termek.service';

@Component({
  selector: 'app-termek-urlap',
  templateUrl: './termek-urlap.component.html',
  styleUrls: ['./termek-urlap.component.css']
})
export class TermekUrlapComponent {
  
  public product:ProductModel;
  public categories: CategoryModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) bármi: ProductModel,
             private termekszerviz:TermekService)
  {
    this.product = bármi;

    this.termekszerviz.listKategoriak().subscribe(
      (data) => {
        this.categories = data;
      }
    )
  }
}
