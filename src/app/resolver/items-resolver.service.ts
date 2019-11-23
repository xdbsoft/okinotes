import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ApiService, Item } from '../services/api.service';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsResolverService implements Resolve<any[]> {

  constructor(private apiService: ApiService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Item[]> {

    const alias = route.paramMap.get('alias');
    const pageId = route.paramMap.get('pageId');

    return this.apiService.getAlias(alias).pipe(
      flatMap(a => {
        return this.apiService.getItems(a.userId, pageId);
      })
    );
  }
}
