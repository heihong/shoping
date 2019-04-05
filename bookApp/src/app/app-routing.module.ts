import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from "./cart/cart.component";
import {BookComponent} from "./book/book.component";

const routes: Routes = [
  {path: 'book', component : BookComponent},
  {path: 'cart', component : CartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
