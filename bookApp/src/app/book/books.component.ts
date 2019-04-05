import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  providers: [ BookService ],
  styleUrls: ['./books.component.css']
})
export class BookComponent implements OnInit{
  constructor(private http: HttpClient , private BookService: BookService){

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
