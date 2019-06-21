import { Injectable } from '@angular/core';

@Injectable()
export class OfferService {

  constructor() {}

  calculMinus(total, value) : number{
    return total - value;
  }

  calculPercentage(total, value) :number {
    return total - (total * value/100);
  }

  calculSlide(total, value, sliceValue) : number {
    let sliceNumber =  Math.trunc(total/ sliceValue);
    return  total - value * sliceNumber;
  }
}
