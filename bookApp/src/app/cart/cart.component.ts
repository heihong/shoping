import { Component, OnInit } from '@angular/core';
import { OfferService} from "../offer/offer.service";

import { CartData } from "../cartData/cartData";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [OfferService],
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  private offers;
  constructor(private cartData: CartData, private offerService : OfferService){
  }

  ngOnInit(){
    if(this.cartData.cart.length > 0){
      this.getOffers(this.getlistIsbn(this.cartData.cart));
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
      this.cartData.offers= data['offers'];
    })
  }

  removeToCart(index){
    this.cartData.cart.splice(index, 1);
    this.getOffers(this.getlistIsbn(this.cartData.cart));
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
            bestOffer = this.getBestOffer(bestOffer, this.offerService.calculPercentage(this.total(this.cartData.cart), offers[i].value), i)
            break;
          case 'minus':
            bestOffer = this.getBestOffer(bestOffer, this.offerService.calculMinus(this.total(this.cartData.cart), offers[i].value), i)
            break;
          case 'slice':
            bestOffer = this.getBestOffer(bestOffer, this.offerService.calculSlide(this.total(this.cartData.cart), offers[i].value, offers[i].sliceValue), i)
            break;

        }
      }
    }
    return bestOffer;
  }


  clearCart(){
    this.cartData.cart.splice(0, this.cartData.cart.length);
  }

  textPercentage(){
    return `-${this.cartData.offers[this.bestOfferCart(this.cartData.offers).index].value}%`;
  }

  textMinus(){
    return `-${this.cartData.offers[this.bestOfferCart(this.cartData.offers).index].value}`;
  }

  textSlice(){
    return `-${this.cartData.offers[this.bestOfferCart(this.cartData.offers).index].value} for each ${this.cartData.offers[this.bestOfferCart(this.cartData.offers).index].sliceValue}`;
  }
}
