import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {BooksComponent} from "./books/books.component";
import {CartComponent} from "./cart/cart.component";

import {Globals} from "./globals/globals";
import {BookComponent} from "./books/book/book.component";


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    CartComponent,
    BookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
