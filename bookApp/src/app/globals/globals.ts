import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  cart: any = [];
  totalAmount : number;
  offers : any;
  bestOffer = { min : -1, index : -1};
}
