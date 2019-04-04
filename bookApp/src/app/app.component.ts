import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ BookService ],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
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
