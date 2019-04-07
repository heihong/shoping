import {Component, OnInit} from '@angular/core';
import { OfferService} from "../offer/offer.service";

import {Globals} from "../globals/globals";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [OfferService],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  private offers;
  constructor(private globals: Globals, private offerService : OfferService){
  }

  ngOnInit(){
    if(this.globals.cart.length > 0){
      this.getOffers(this.getlistIsbn(this.globals.cart));
    }

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
    this.offerService.getOffer(listIsbn).subscribe((data)=>{
      this.globals.offers= data['offers'];
    })
  }

  getOffer(bestOffer, resultCalcul, index){
    if(bestOffer.min == -1){
      bestOffer.min = resultCalcul;
      bestOffer.index = index;
      return bestOffer;
    }
    if(bestOffer.min > resultCalcul){
      bestOffer.min = resultCalcul;
      bestOffer.index = index;
    }
    return bestOffer;
  }


  bestOffer(offers){
    let bestOffer = {
      min: -1,
      index : -1
    };
    if(offers) {
      for (let i = 0; i < offers.length; i++) {
        if (offers[i].type == 'percentage') {
          bestOffer = this.getOffer(bestOffer, this.offerService.calculPercentage(this.total(this.globals.cart), offers[i].value), i)
        }
        if (offers[i].type == 'minus') {
          bestOffer = this.getOffer(bestOffer, this.offerService.calculMinus(this.total(this.globals.cart), offers[i].value), i)
        }
        if (offers[i].type == 'slice') {
          bestOffer = this.getOffer(bestOffer, this.offerService.calculSlide(this.total(this.globals.cart), offers[i].value, offers[i].sliceValue), i)
        }
      }
    }
    return bestOffer;
  }


  clearCart(){
    this.globals.cart.splice(0, this.globals.cart.length);
  }

  textPercentage(){
    return '-' + this.globals.offers[this.bestOffer(this.globals.offers).index].value + '%';
  }

  textMinus(){
    return '-' + this.globals.offers[this.bestOffer(this.globals.offers).index].value;
  }

  textSlice(){
    return '-' + this.globals.offers[this.bestOffer(this.globals.offers).index].value +' for each ' + this.globals.offers[this.bestOffer(this.globals.offers).index].sliceValue;
  }


}
