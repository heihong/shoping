import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './book.service';
import { Globals} from "../globals/globals";

@Component({
  selector: 'app-books',
  templateUrl: './book.component.html',
  providers: [ BookService],
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  constructor(private http: HttpClient , private BookService: BookService, private globals : Globals){

  }

  ngOnInit(){
    this.showConfig();
  }

  books : Object;
  cart =  this.globals.cart;

  showConfig() {
    this.BookService.getBooks()
      .subscribe((data) =>
        this.books = data
      );
  }

  addToCart(book){
    this.cart.push(book);
    this.globals.cart = this.cart;
  }
}
