import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService, PageProperties, User, Page } from 'src/app/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  user: User;

  newPage : Page;

  constructor(private route: ActivatedRoute, 
              private apiService: ApiService, 
              private titleService: TitleService,
              private router: Router) {}

  ngOnInit() {
    this.newPage = {
      id : '',
      userId: '',
      title : '',
      policy : 'PRIVATE',
      templateID : 'micro-blog'
    };
    this.titleService.setTitle('Create a new page');
    this.route.data.subscribe( (data: {user: User}) => {
      this.user = data.user;
      this.newPage.userId = data.user.id;
    });
  }

  onSubmitPage(p : Page) {
    const regex = /[^a-z0-9]+/gi;
    p.id = p.title.toLowerCase().replace(regex, '-');
    this.apiService.putPage(this.user.id, p.id, p).subscribe(
       v=> this.router.navigate(['p', this.user.alias, p.id]) 
    );
  }

}
