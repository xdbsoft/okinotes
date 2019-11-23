import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { User } from './api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private oauthService: OAuthService, private router: Router) { }

  login() : void {
    console.log("init login flow");
    this.oauthService.initLoginFlow();
  }

  logout() : void {
    console.log("logout")
    this.oauthService.logOut(false);
    this.router.navigate(['/']);
  }

  public isLoggedIn() : boolean {
    return !!this.oauthService.getIdentityClaims();
  }

  public get basicUser() : User {
    let claims = this.oauthService.getIdentityClaims();
    if (!claims) return null;
    let u = new User()
    u.id = claims['sub']
    u.name = claims['name']
    u.email = claims['email']
    return u;
  }

}
