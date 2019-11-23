import { Component, OnInit } from '@angular/core';
import { User, ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;

  userForm = this.fb.group({
    alias: ['', Validators.required]
  });


  constructor(private route: ActivatedRoute, 
              private fb: FormBuilder, 
              private apiService: ApiService,
              private titleService: TitleService) { }

  ngOnInit() {
    this.route.data.subscribe( (data: {user: User}) => {
      this.user = data.user;
      this.titleService.setTitle(data.user.name);
      this.userForm.setValue({
        alias: data.user.alias
      })
    });
  }

  get alias() { return this.userForm.get('alias'); }

  onSubmit() {

    if (this.user.alias === this.userForm.value.alias) {
      return;
    }

    //Save the alias
    this.apiService.saveAlias(this.userForm.value.alias, this.user.id).subscribe(
      v => {
        // Update the user        
        const oldAlias = this.user.alias;
        this.user.alias = this.userForm.value.alias;
        this.apiService.saveUser(this.user).subscribe(
          v => {
            // Remove old alias
            this.apiService.deleteAlias(oldAlias);
          });
      }
    );
  }
}
