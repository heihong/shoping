import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BooksComponent } from "./books/books.component";
import { CartComponent } from "./cart/cart.component";

import { CartData } from "./cartData/cartData";
import { BookComponent } from "./book/book.component";
import { FilterPipe } from "./cart/pipe/filter.pipe";
import {InMemoryBooksService} from "./memoryData/InMemoryBooksService";


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
    FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryBooksService, { dataEncapsulation: false },
    )
  ],
  providers: [CartData],
  bootstrap: [AppComponent]
})
export class AppModule { }
