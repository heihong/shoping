import { Injectable } from '@angular/core';

@Injectable()
export class CartService {

  cart = [];

  constructor() {}

  addToCart(book){
    this.cart.push(book);
  }

}
