import { Component, OnInit } from '@angular/core';
import { OfferService} from "../offer/offer.service";

import { CartData } from "../cartData/cartData";
import {resultOffer} from "../models/resultOffer.model";
import {Offer} from "../models/offer.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  providers: [OfferService],
  styleUrls: ['./cart.component.css']
})



export class CartComponent implements OnInit{

  private offers : Offer[] = [
    {
      type: 'percentage',
      value: 5
    },
    {
      type: 'minus',
      value: 15
    },
    {
      type: 'slice',
      sliceValue: 100,
      value: 12
    }
  ];

  private totalCart :number;
  private resultOffers;
  private bestOffer;
  private textDiscount;

  constructor(private cartData: CartData, private offerService : OfferService){
  }

  ngOnInit(){
    this.updateData();
  }

  updateData() : void {
	  this.totalCart = this.total(this.cartData.cart);
	  this.resultOffers = this.getResultOffers(this.offers);
	  this.bestOffer = this.getBestOffer(this.resultOffers);
	  this.textDiscount = this.getTextDiscount(this.bestOffer.type);
  }


  total(books) :number {
    return books.reduce((acc, b) => acc + b.price, 0);
  }

  removeToCart(index) :void {
    this.cartData.cart.splice(index, 1);
    // this.getOffers(this.getlistIsbn(this.cartData.cart));
	  this.updateData();
  }


  getResultOffers(offers) : resultOffer[]{
    let resultOffers = [];
    let result = {calcul:-1,
                  type : ''
    };
    for (let i = 0; i < offers.length; i++) {
      switch (offers[i].type) {
        case 'percentage':
          result.calcul = this.offerService.calculPercentage(this.totalCart, offers[i].value);
          break;
        case 'minus':
          result.calcul = this.offerService.calculMinus(this.totalCart, offers[i].value);
          break;
        case 'slice':
          result.calcul = this.offerService.calculSlide(this.totalCart, offers[i].value, offers[i].sliceValue);
          break;

      }
      result.type = offers[i].type;
	    let resultCopy = Object.assign({}, result);
      resultOffers.push(resultCopy);
    }
	  return resultOffers;
  }

  getBestOffer(resultOffers) : resultOffer {
    return resultOffers.reduce((acc, val) => {
		if(acc.calcul === undefined || val.calcul < acc.calcul){
			acc.calcul = val.calcul;
			acc.type = val.type;
		}
      return acc;
    },{});
  }


  clearCart() : void {
    this.cartData.cart.splice(0, this.cartData.cart.length);
  }

  textPercentage(value) :String {
    return `-${value}%`;
  }

  textMinus(value) :String {
    return `-${value}`;
  }

  textSlice(value, sliceValue) :String{
    return `-${value} for each ${sliceValue}`;
  }

  getTextDiscount(type) :String {
	 let bestOffer = this.offers.filter(el => el.type == type);

	 switch (bestOffer[0].type) {
          case 'percentage':
            return this.textPercentage(bestOffer[0].value);

          case 'minus':
           return this.textMinus(bestOffer[0].value);

          case 'slice':
            return this.textSlice(bestOffer[0].value, bestOffer[0].sliceValue);


        }
  }

}
