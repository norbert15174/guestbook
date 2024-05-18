import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from "./book/book.component";
import {CodeComponent} from "./code/code.component";
import {appEntryGuards, appGuards} from "./app-guards";

export const ROUTES: Routes = [
  {
    canActivate: [appEntryGuards],
    path: 'book',
    component: BookComponent,
    pathMatch: 'full'
  },
  {
    canActivate: [appGuards],
    path: 'code',
    component: CodeComponent,
    pathMatch: 'full'
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
