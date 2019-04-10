import { Component, OnInit } from '@angular/core';
import { OfferService} from "../offer/offer.service";

import { Globals } from "../globals/globals";

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
    return books.reduce((acc, b) => acc + b.price, 0);
  }

  getlistIsbn(books){
    return books.map(b => b.isbn);
  }


  getOffers(listIsbn){
    this.offerService.getOffer(listIsbn).subscribe((data)=>{
      this.globals.offers= data['offers'];
    })
  }

  removeToCart(index){
    this.globals.cart.splice(index, 1);
    this.getOffers(this.getlistIsbn(this.globals.cart));
  }

  getBestOffer(bestOffer, resultCalcul, index){
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


  bestOfferCart(offers){
    let bestOffer = {
      min: -1,
      index : -1
    };
    if(offers) {
      for (let i = 0; i < offers.length; i++) {
        switch (offers[i].type) {
          case 'percentage':
            bestOffer = this.getBestOffer(bestOffer, this.offerService.calculPercentage(this.total(this.globals.cart), offers[i].value), i)
            break;
          case 'minus':
            bestOffer = this.getBestOffer(bestOffer, this.offerService.calculMinus(this.total(this.globals.cart), offers[i].value), i)
            break;
          case 'slice':
            bestOffer = this.getBestOffer(bestOffer, this.offerService.calculSlide(this.total(this.globals.cart), offers[i].value, offers[i].sliceValue), i)
            break;

        }
      }
    }
    return bestOffer;
  }


  clearCart(){
    this.globals.cart.splice(0, this.globals.cart.length);
  }

  textPercentage(){
    return `-${this.globals.offers[this.bestOfferCart(this.globals.offers).index].value}%`;
  }

  textMinus(){
    return `-${this.globals.offers[this.bestOfferCart(this.globals.offers).index].value}`;
  }

  textSlice(){
    return `-${this.globals.offers[this.bestOfferCart(this.globals.offers).index].value} for each ${this.globals.offers[this.bestOfferCart(this.globals.offers).index].sliceValue}`;
  }
}
