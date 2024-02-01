import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category-model';

@Injectable({
  providedIn: 'root'
})
export class TermekService {

  private url:string = 'http://localhost:8000/api/termek';

  constructor(private backend:HttpClient) { }

  public listTermekek():Observable<ProductModel[]> {
    let token = sessionStorage.getItem("token");
    return this.backend
          .get<ProductModel[]>(this.url,{headers: {
             "Authorization": "Bearer "+token
            }
          })

          /*    .subscribe( 
        (dataFromBackend) => {
          this.termekek = dataFromBackend;
        }
      )*/
    }

  public listKategoriak():Observable<CategoryModel[]> {
    let token = sessionStorage.getItem("token");
    return this.backend
      .get<CategoryModel[]>('http://localhost:8000/api/kategoria', {headers: {
          "Authorization": "Bearer "+token
        }
      })
  }

  deleteTermek(termek:ProductModel):Observable<boolean> {
    let token = sessionStorage.getItem("token");

      return this.backend.delete<boolean>(this.url+"/"+termek.id,{headers: {
        "Authorization": "Bearer "+token
       }
      });
  }

  updateTermek(termek:ProductModel):Observable<ProductModel> {
    let token = sessionStorage.getItem("token");

    return this.backend.put<ProductModel>(this.url+"/"+termek.id, termek, {headers: {
      "Authorization": "Bearer "+token
     }
    });
  }

  insertTermek(termek:ProductModel):Observable<ProductModel> {
    let token = sessionStorage.getItem("token");

    return this.backend.post<ProductModel>(this.url, termek, {headers: {
      "Authorization": "Bearer "+token
     }
    });
  }

}
