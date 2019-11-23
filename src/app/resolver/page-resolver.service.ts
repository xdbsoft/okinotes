import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService, Page } from '../services/api.service';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PageResolverService implements Resolve<Page> {

  constructor(private apiService : ApiService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Page> {

    const alias = route.paramMap.get('alias');
    const pageId = route.paramMap.get('pageId');

    return this.apiService.getAlias(alias).pipe(
      flatMap(a => {
        return this.apiService.getPage(a.userId, pageId);
      })
    );
  }
}
