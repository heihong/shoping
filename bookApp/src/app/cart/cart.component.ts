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


}
