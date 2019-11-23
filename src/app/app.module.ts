import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PageComponent } from './pages/page/page.component';
import { CreateComponent } from './pages/create/create.component';
import { NavbarComponent } from './widget/navbar/navbar.component';
import { UserNavbarComponent } from './widget/user-navbar/user-navbar.component';
import { FooterComponent } from './widget/footer/footer.component';
import { PagesListComponent } from './widget/pages-list/pages-list.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { apiConfig } from './api-config';
import { ApiInterceptor } from './api-interceptor';
import { UserComponent } from './pages/user/user.component';
import { PageEditorComponent } from './widget/editor/page-editor/page-editor.component';
import { ItemCreatorComponent } from './widget/url-list/item-creator/item-creator.component';
import { ItemEditableComponent } from './widget/url-list/item-editable/item-editable.component';
import { ItemListComponent } from './widget/url-list/item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateComponent,
    PageComponent,
    NavbarComponent,
    UserNavbarComponent,
    FooterComponent,
    PagesListComponent,
    NotFoundComponent,
    UserComponent,
    PageEditorComponent,
    ItemCreatorComponent,
    ItemEditableComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          smartypants: false,
        },
      }
    }),
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: [apiConfig.url,'https://grest.okiapps.com/'],
          sendAccessToken: true
      }
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}, 
    { provide: OAuthStorage, useFactory: () => { return sessionStorage; } },
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
