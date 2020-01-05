import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Page, ApiService } from '../services/api.service';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyPagesResolverService implements Resolve<Page[]> {

  constructor(private apiService: ApiService, private userService : UserService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page[]> | Page[] {
    if (!this.userService.basicUser) {
      return [];
    }
    return this.apiService.getPages(this.userService.basicUser.id).pipe(
      catchError(err => {
        console.error('getPages failed', err);
        const emptyArray : Page[]  = [] ;
        return of(emptyArray);
      })
    );
  }
}
