import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksService } from './books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  providers: [ BooksService],
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit{
  constructor(private http: HttpClient , private booksService: BooksService){

  }

  ngOnInit(){
    this.showConfig();
  }

  books : Object;

  showConfig() {
    this.booksService.getBooks()
      .subscribe((data) =>
        this.books = data
      );
  }
}
