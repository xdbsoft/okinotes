import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User, ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {

  constructor(private apiService: ApiService, private userService : UserService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    if (!this.userService.basicUser) {
      return null;
    }
    return this.apiService.getUser(this.userService.basicUser.id);  
  }
}
