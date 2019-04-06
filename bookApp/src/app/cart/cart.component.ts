import { Component } from '@angular/core';
import { CartService } from './../cart/cart.service';

import {Globals} from "../globals/globals";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [ CartService ],
})
export class CartComponent{

  constructor( private CartService : CartService, private globals: Globals){
  }

  total(){
    let total = 0 ;
    for(let i = 0 ; i< this.globals.cart.length ; i++){
      total = total + this.globals.cart[i].price;
    }
    return total;
  }


}
