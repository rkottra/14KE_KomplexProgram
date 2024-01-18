import { Component } from '@angular/core';
import { UserModel } from '../models/user-model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

    public user:UserModel = {
      email :"kottra.richard@jedlik.eu",
      password :"123"
    };

    constructor (public szerviz:UserService) {

    }

    login() {
      this.szerviz.login(this.user);
    }

    logout() {
      this.szerviz.logout(this.user);
    }

}
