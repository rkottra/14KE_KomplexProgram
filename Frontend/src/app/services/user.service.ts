import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user-model';
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
            sessionStorage.setItem("token", valasz.token);
            sessionStorage.setItem("abilities", valasz.abilities);
          }
        }
      );
  }

  logout(user:UserModel) {
    let token = sessionStorage.getItem("token");

    this.http.post<boolean>(this.url+"logout", "", 
    { headers: {
      "Authorization": "Bearer "+token
     }
    }).subscribe();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("abilities");
  }

  getCookie(name:string) {
    function escape(s:any) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

  isUserLoggedIn() {
    let token = sessionStorage.getItem("token");
    return token != null && token !== "";
  }

  hasAbilities(ability:string) {
    let abilities = sessionStorage.getItem("abilities")||"";
    return (abilities.indexOf(ability) >= 0);
  }
}
