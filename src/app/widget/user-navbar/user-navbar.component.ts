import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ApiService, User } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  @Input()
  user: User;

  @Output()
  logout: EventEmitter<any> = new EventEmitter();

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  onLogin() {
    this.userService.login();
    return false;
  }

  onLogout() {
    this.userService.logout();
    this.user = undefined;
    this.logout.emit(null);
    return false;
  }

}
