import { Pipe, PipeTransform } from '@angular/core';
import {Book} from "../../models/book.model";
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(books: Book[], searchText: string): Book[] {
    if(!books){
      return [];
    }
    if(!searchText) {
      return books;
    }
    searchText = searchText.toLowerCase();
    return books.filter( it => {
      return it.title.toLowerCase().includes(searchText);
    });
  }
}
