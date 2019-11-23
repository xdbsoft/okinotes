import { Component } from '@angular/core';

import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth-config';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'okinotes';

  constructor(
    private authStorage: OAuthStorage,
    private oauthService: OAuthService, 
    private apiService: ApiService, 
    private userService: UserService) {
    this.configure();
  }

  private configure() {
    console.log('oidc configuration', authConfig)
    this.oauthService.events.subscribe(e => {
      if (e.type==='token_received') {
        this.apiService.getUser(this.userService.basicUser.id).subscribe(
          undefined, 
          error => {
            if (error.status === 404) {
              const u = this.userService.basicUser;
              this.apiService.saveUser(u);
            }
          });
      }
      console.log('oidc event', e);
    });
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
       .then(info => console.debug('loadDiscoveryDocumentAndTryLogin ok', info))
       .catch(err => console.error('loadDiscoveryDocumentAndTryLogin error', err));
  }
  
}
