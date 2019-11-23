import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Page, ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MyPagesResolverService implements Resolve<Page[]> {

  constructor(private apiService: ApiService, private userService : UserService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page[]> | Page[] {
    if (!this.userService.basicUser) {
      return [];
    }
    return this.apiService.getPages(this.userService.basicUser.id);  
  }
}
