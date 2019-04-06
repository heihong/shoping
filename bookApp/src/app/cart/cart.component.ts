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

  getSup( bestOfferTotal, resultCalcul){
    if(bestOfferTotal == -1){
      return resultCalcul;
    }
    let result : number;
    result = bestOfferTotal > resultCalcul ? resultCalcul : bestOfferTotal;
    return result;
  }


  bestOffer(offers, books){
    let bestOfferTotal : number = -1;
    for(let i = 0 ; i< offers.length ; i++){
      if(offers[i].type == 'percentage'){
        bestOfferTotal = this.getSup(bestOfferTotal , this.offerService.calculPercentage(this.total(books), offers[i].value))
      }
      if(offers[i].type == 'minus'){
        bestOfferTotal = this.getSup(bestOfferTotal , this.offerService.calculMinus(this.total(books), offers[i].value))
      }
      if(offers[i].type == 'slice'){
        bestOfferTotal = this.getSup(bestOfferTotal , this.offerService.calculSlide(this.total(books), offers[i].value, offers[i].sliceValue))
      }
    }
    return bestOfferTotal;
  }




}
