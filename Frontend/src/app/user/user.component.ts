import { Component } from '@angular/core';
import { UserModel } from '../user-model';
import { UserService } from '../user.service';

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

    constructor (private szerviz:UserService) {

    }

    login() {
      this.szerviz.login(this.user);
    }

}
