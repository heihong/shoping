import { Component } from '@angular/core';
import { CartService } from './../cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [ CartService ],
})
export class CartComponent{

  cart = [];

  constructor( private CartService : CartService){
    this.cart = this.CartService.cart;
  }
}
