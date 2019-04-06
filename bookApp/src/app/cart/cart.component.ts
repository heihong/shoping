import { Component } from '@angular/core';
import { OfferService} from "../offer/offer.service";

import {Globals} from "../globals/globals";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [OfferService],
})
export class CartComponent{

  private offers;
  constructor(private globals: Globals, private offerService : OfferService){
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

  getInfIndex( bestOfferTotal, resultCalcul, index){
    if(bestOfferTotal[0] == -1){
      return [resultCalcul , index]
    }
    if(bestOfferTotal[0] > resultCalcul){
      return [resultCalcul , index];
    }else {
      return bestOfferTotal;
    }

  }


  bestOffer(offers, books){
    let bestOfferTotal = [-1, -1];
    for(let i = 0 ; i< offers.length ; i++){
      if(offers[i].type == 'percentage'){
        bestOfferTotal = this.getInfIndex(bestOfferTotal , this.offerService.calculPercentage(this.total(books), offers[i].value) ,i)
      }
      if(offers[i].type == 'minus'){
        bestOfferTotal = this.getInfIndex(bestOfferTotal , this.offerService.calculMinus(this.total(books), offers[i].value) ,i)
      }
      if(offers[i].type == 'slice'){
        bestOfferTotal = this.getInfIndex(bestOfferTotal , this.offerService.calculSlide(this.total(books), offers[i].value, offers[i].sliceValue),i)
      }
    }
    return bestOfferTotal;
  }




}
