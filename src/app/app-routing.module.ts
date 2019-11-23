import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/create/create.component';
import { PageComponent } from './pages/page/page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guard/auth.guard';
import { MyPagesResolverService } from './resolver/my-pages-resolver.service';
import { PageResolverService } from './resolver/page-resolver.service';
import { ItemsResolverService } from './resolver/items-resolver.service';
import { UserComponent } from './pages/user/user.component';
import { UserResolverService } from './resolver/user-resolver.service';

const routes: Routes = [
  { 
    path: 'p/:alias/:pageId', 
    component: PageComponent,
    resolve: {
      user: UserResolverService,
      page: PageResolverService,
      items: ItemsResolverService
    }
    //TODO: child for view and edit
  },
  { 
    path: 'create', 
    component: CreateComponent, 
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolverService
    }
  },
  { 
    path: 'user', 
    component: UserComponent, 
    canActivate: [AuthGuard],
    resolve: {
      user: UserResolverService
    }
  },
  { 
    path: 'home', 
    component: HomeComponent,
    resolve: {
      pages: MyPagesResolverService
    }
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
