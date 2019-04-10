import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksService } from './books.service';
import { Globals } from "../globals/globals";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  providers: [ BooksService],
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  constructor(private http: HttpClient , private booksService: BooksService, private globals : Globals){

  }

  private books : Object;

  ngOnInit(){
    this.booksService.getBooks()
      .subscribe((data) =>
        this.books = data
      );
  }

  addToCart(book) {
    this.globals.cart.push(book);
  }


}
