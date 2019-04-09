import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {BooksComponent} from "./books/books.component";
import {CartComponent} from "./cart/cart.component";

import {Globals} from "./globals/globals";
import {BookComponent} from "./book/book.component";
import {FilterPipe} from "./cart/pipe/filter.pipe";


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    CartComponent,
    BookComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
