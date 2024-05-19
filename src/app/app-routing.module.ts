import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from "./book/book.component";
import {CodeComponent} from "./code/code.component";
import {appGuards} from "./app-guards";
import {authGuardGuard} from "./auth-guard.guard";
import {TableComponent} from "./table/table.component";

export const ROUTES: Routes = [
  {
    path: 'code',
    component: CodeComponent,
    canActivate: [appGuards]
  },
  {
    path: 'book',
    component: BookComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'table',
    component: TableComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: '**',
    redirectTo: '/code'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
