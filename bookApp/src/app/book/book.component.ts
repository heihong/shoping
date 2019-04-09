import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from "../models/book.model"

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent{

  @Input() book: Book;
  @Input() nameButton: string;
  @Output() eventButton = new EventEmitter<string>();

}
