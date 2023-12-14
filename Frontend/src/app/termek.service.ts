import { Injectable } from '@angular/core';
import { TermekModel } from './termek-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermekService {

//  public termekek: TermekModel[] = [];

  constructor(private backend:HttpClient) { }

  public listTermekek():Observable<TermekModel[]> {
    return this.backend
        .get<TermekModel[]>('http://localhost:8000/api/termek');
/*    .subscribe( 
      (dataFromBackend) => {
        this.termekek = dataFromBackend;
      }
    )*/
  }
}
