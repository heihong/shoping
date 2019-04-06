import { Component } from '@angular/core';
import { CartService } from './../cart/cart.service';
import { OfferService} from "../offer/offer.service";

import {Globals} from "../globals/globals";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [ CartService , OfferService],
})
export class CartComponent{

  private offers;
  constructor( private CartService : CartService, private globals: Globals, private offerService : OfferService){
  }

  total(books){
    let total = 0 ;
    for(let i = 0 ; i< books.length ; i++){
      total = total + books[i].price;
    }
    return total;
  }

  getlistIsbn(books){
    let istIsbn = [];

    for(let i = 0 ; i< books.length ; i++){
      istIsbn.push(books[i].isbn);
    }
    return istIsbn;
  }


  getOffers(listIsbn){
    this.offerService.getOffer(this.getlistIsbn(listIsbn)).subscribe((data)=>{
      this.offers= data['offers'];
    })
    return this.offers;
  }


}
