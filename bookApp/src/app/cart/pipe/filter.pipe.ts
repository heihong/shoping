import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(books: any[], searchText: string): any[] {
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
