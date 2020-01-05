import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input()
  currentUser : User;

  @Output()
  login: EventEmitter<any> = new EventEmitter();
  @Output()
  logout: EventEmitter<any> = new EventEmitter();

  navbarCollapsed : boolean = true;

  constructor() { }

  ngOnInit() {
  }

  onLogin() {
    this.navbarCollapsed = true;
    this.login.emit(null);
    return false;
  }

  onLogout() {
    this.navbarCollapsed = true;
    this.logout.emit(null);
    return false;
  }

}
