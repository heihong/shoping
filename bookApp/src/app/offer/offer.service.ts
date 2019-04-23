import { Injectable } from '@angular/core';

@Injectable()
export class OfferService {

  constructor() {}

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
