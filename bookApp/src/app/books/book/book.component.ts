import { Component, Input } from '@angular/core';
import { Globals} from "../../globals/globals";
import {Book} from "./../../models/book.model"

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent{

  @Input() book: Book;

  constructor(private globals : Globals){

  }

  addToCart(book) {
    this.globals.cart.push(book);
  }
}
