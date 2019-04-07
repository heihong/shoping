import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Globals} from "../../globals/globals";
import {Book} from "./../../models/book.model"

@Component({
  selector: 'app-book-cart',
  templateUrl: './bookCart.component.html'
})
export class BookCartComponent{

  @Input() book: Book;
  @Input() index: number;
  @Output() uploaded = new EventEmitter<string>();


  constructor(private globals : Globals){

  }

  removeToCart(index){
    this.globals.cart.splice(index, 1);
    this.uploaded.emit('complete');
  }
}
