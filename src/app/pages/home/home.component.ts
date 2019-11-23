import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService, User } from 'src/app/services/api.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pages : Document[];
  user: User;

  constructor(private userService: UserService, 
              private apiService: ApiService, 
              private titleService: TitleService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.titleService.setTitle('');

    this.route.data.subscribe( (data: {pages: Document[]}) => {
      this.pages = data.pages;
    });
    
    if (this.userService.basicUser) {
      this.apiService.getUser(this.userService.basicUser.id).subscribe(u => {
        this.user = u;
      });
    }
  }

  onLogout() {
    this.user = undefined;
    this.pages = undefined;
  }

}
