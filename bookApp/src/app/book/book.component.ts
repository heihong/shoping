import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './book.service';
import { CartService } from './../cart/cart.service';

@Component({
  selector: 'app-books',
  templateUrl: './book.component.html',
  providers: [ BookService , CartService ],
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{
  constructor(private http: HttpClient , private BookService: BookService, private CartService : CartService){

  }

  ngOnInit(){
    this.showConfig();
  }

  books : Object;

  showConfig() {
    this.BookService.getBooks()
      .subscribe((data) =>
        this.books = data
      );
  }
}
