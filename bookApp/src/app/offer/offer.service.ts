import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OfferService {

  constructor(private http: HttpClient) { }

  getOffer(booksIsbn) {
    return this.http.get(`http://henri-potier.xebia.fr/books/` + booksIsbn.join(',') + `/commercialOffers`)
  }

  calculMinus(total, value){
    return total - value;
  }

  calculPercentage(total, value){
    return total - (total * value/100);
  }

  calculSlide(total, value, sliceValue){
    let sliceNumber =  Math.trunc(total/ sliceValue);
    return  total - value * sliceNumber;
  }
}
