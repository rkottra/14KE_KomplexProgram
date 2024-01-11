import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from './user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url:string = 'http://localhost:8000/api/';
  

  constructor(private http:HttpClient) { }

  login(user:UserModel) {
    return this.http.post<string>(this.url+"login", user)
      .subscribe( 
        (valasz:any) => {
          if (valasz.token != "")  {
            alert("bejelentkezés sikerült");
            localStorage.setItem("token", valasz.token);
          }
        }
      );
  }

  logout(user:UserModel) {
    this.http.post<boolean>(this.url+"logout", user).subscribe();
    localStorage.removeItem("token");
  }
}
