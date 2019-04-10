import { Component , OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksService } from './books.service';
import { CartData } from "../cartData/cartData";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  providers: [ BooksService],
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  constructor(private http: HttpClient , private booksService: BooksService, private cartData : CartData){

  }

  private books : Object;

  ngOnInit(){
    this.booksService.getBooks()
      .subscribe((data) =>
        this.books = data
      );
  }

  addToCart(book) {
    this.cartData.cart.push(book);
  }


}
