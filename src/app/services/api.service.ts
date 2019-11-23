import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '../api-config';
import { Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';


export class DocumentInfo {
  id: string
  creationDate?: Date
  lastModificationDate?: Date
}
export class AliasProperties {
  userId: string
}
export class Alias extends DocumentInfo {
  userId: string
}
export class UserProperties {
  name: string
  email: string
  alias: string
};
export class User extends DocumentInfo {
  name: string
  email: string
  alias: string
}
export class PageProperties {
  title: string
  policy: string
  templateID: string
};
export class Page extends DocumentInfo {
  userId: string
  title: string
  policy: string
  templateID: string
};
export class ItemProperties {
  title: string
  content: string
  url: string
};
export class Item extends DocumentInfo {
  userId: string
  pageId: string
  title: string
  content: string
  url: string
};

class Document extends DocumentInfo {
  properties: PageProperties | UserProperties | AliasProperties | ItemProperties
};
class Collection {
  id: string
  features: Document[]
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private aliasUrl(alias: string) : string {
    return apiConfig.url + apiConfig.aliasName + '/' + alias;
  }

  
  getAlias(alias: string) : Observable<Alias> {
    console.debug('calling getAlias', alias);
    return this.http.get<Document>(this.aliasUrl(alias)).pipe(
      map(d => {
        const a = d.properties as AliasProperties;
        return {
          id: d.id,
          creationDate: d.creationDate,
          lastModificationDate: d.lastModificationDate,
          userId: a.userId
        }
      })
    );
  }

  saveAlias(alias: string, userId: string) : Observable<any> {
    console.debug('calling saveAlias', alias, userId)
    const p : AliasProperties = {userId: userId};
    const d : Document = {
      id: alias,
      properties: p
    };
    return this.http.put(this.aliasUrl(alias), d)
  }

  deleteAlias(alias: string) : Observable<any> {
    console.debug('calling deleteAlias', alias)
    return this.http.delete(this.aliasUrl(alias))
  }

  private userUrl(userId: string) : string {
    return apiConfig.url + apiConfig.collectionName + '/' + userId;
  }

  getUser(userId: string) : Observable<User> {
    console.debug('calling getUser', userId)
    return this.http.get<Document>(this.userUrl(userId)).pipe(
      map(d => {
        const u = d.properties as UserProperties;
        const user : User = {
          id: d.id,
          creationDate: d.creationDate,
          lastModificationDate: d.lastModificationDate,
          name: u.name,
          email: u.email,
          alias: u.alias,
        }
        return user;
      })
    );
  }

  saveUser(user: User) : Observable<any> {
    console.debug('calling saveUser', user)
    const p : UserProperties = {name: user.name, email: user.email, alias: user.alias};
    const d : Document = {
      id: user.id,
      properties: p
    };
    return this.http.put(this.userUrl(user.id), d);
  }

  pageUrl(userId: string, pageId: string) : string {
    if (pageId.length == 0) {
      return this.userUrl(userId) + '/pages';
    }
    return this.userUrl(userId) + '/pages/' + pageId;
  }

  toPage(d: Document, userId: string) : Page {
    const props = d.properties as PageProperties;
      const p : Page = {
        id: d.id,
        creationDate: d.creationDate,
        lastModificationDate: d.lastModificationDate,
        userId: userId,
        title: props.title,
        templateID: props.templateID,
        policy: props.policy,
      };
      return p;
  }

  getPages(userId: string) : Observable<Page[]> {
    console.debug('calling getPages', userId);
    return this.http.get<Collection>(this.pageUrl(userId,'')).pipe(
      map( c => {
        if (c.features) {
          return c.features.map(v => this.toPage(v, userId));
        }
        return [];
      })
    );
  }

  getPage(userId: string, pageId: string) : Observable<Page> {
    console.debug('calling getPage', userId, pageId);
    return this.http.get<Document>(this.pageUrl(userId, pageId)).pipe(
      map(v => this.toPage(v, userId))
    );
  }
  putPage(userId: string, pageId: string, page: PageProperties) {
    console.debug('calling putPage', userId, pageId, page);
    const d : Document = {
      id: pageId,
      properties: page
    }
    return this.http.put(this.pageUrl(userId, pageId), d)
  }
  deletePage(userId: string, pageId: string) {
    console.debug('calling deletePage', userId, pageId);
    return this.http.delete(this.pageUrl(userId, pageId)).pipe(
      flatMap(v => this.http.delete(this.itemUrl(userId, pageId, '')))
    );
  }

  itemUrl(userId: string, pageId: string, itemId: string) : string {
    if (itemId.length == 0) {
      return this.pageUrl(userId, pageId) + '/items';
    }
    return this.pageUrl(userId, pageId) + '/items/' + itemId;
  }

  toItem(d: Document, userId: string, pageId: string) : Item {
    const props = d.properties as ItemProperties;
      const i : Item = {
        id: d.id,
        creationDate: d.creationDate,
        lastModificationDate: d.lastModificationDate,
        userId: userId,
        pageId: pageId,
        title: props.title,
        content: props.content,
        url: props.url,
      };
      return i;
  }
  getItems(userId: string, pageId: string) : Observable<Item[]> {
    console.debug('calling getItems', userId, pageId)
    return this.http.get<Collection>(this.itemUrl(userId, pageId,'')).pipe(
      map( c => {
        if (c.features) {
          return c.features.map(v => this.toItem(v, userId, pageId))
        }
        return [];
      })
    );
  }
  addItem(userId: string, pageId: string, item: ItemProperties) :  Observable<Item>{
    console.debug('calling addItem', userId, pageId, item)
    return this.http.post<Document>(this.itemUrl(userId, pageId,''), item).pipe(
      map(v => this.toItem(v, userId, pageId))
    );
  }
  saveItem(userId: string, pageId: string, itemId: string, item: ItemProperties) {
    console.debug('calling saveItem', userId, pageId, itemId, item)
    const d : Document = {
      id: itemId,
      properties: item
    }
    return this.http.put(this.itemUrl(userId, pageId, itemId), d);
  }
  deleteItem(userId: string, pageId: string, itemId: string) {
    console.debug('calling deleteItem', userId, pageId, itemId)
    return this.http.delete(this.itemUrl(userId, pageId, itemId))
  }


}
