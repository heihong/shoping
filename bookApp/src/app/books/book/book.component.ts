import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksService } from './../books.service';
import { Globals} from "../../globals/globals";
import {Book} from "./../../models/book.model"

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  providers: [ BooksService ]
})
export class BookComponent{

  @Input() book: Book;

  constructor(private http: HttpClient , private BookService: BooksService, private globals : Globals){

  }

  addToCart(book){
    this.globals.cart.push(book);
    this.sortBy('price');
  }
  sortBy(field: string) {
    this.globals.cart.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
  }
}
