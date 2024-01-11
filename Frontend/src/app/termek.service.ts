import { Injectable } from '@angular/core';
import { TermekModel } from './termek-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TermekService {

//  public termekek: TermekModel[] = [];


  private url:string = 'http://localhost:8000/api/termek';

  constructor(private backend:HttpClient) { }

  public listTermekek():Observable<TermekModel[]> {
    let token = localStorage.getItem("token");
    return this.backend
          .get<TermekModel[]>(this.url,{headers: {
             "Authorization": "Bearer "+token
            }
          })

          /*    .subscribe( 
        (dataFromBackend) => {
          this.termekek = dataFromBackend;
        }
      )*/
    }

  deleteTermek(termek:TermekModel):Observable<boolean> {
    let token = localStorage.getItem("token");

      return this.backend.delete<boolean>(this.url+"/"+termek.id,{headers: {
        "Authorization": "Bearer "+token
       }
      });
  }

  updateTermek(termek:TermekModel):Observable<TermekModel> {
    return this.backend.put<TermekModel>(this.url+"/"+termek.id, termek);
  }

  insertTermek(termek:TermekModel):Observable<TermekModel> {
    return this.backend.post<TermekModel>(this.url, termek);
  }

}
