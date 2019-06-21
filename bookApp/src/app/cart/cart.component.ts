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

  private offers = [
    {
      "type": "percentage",
      "value": 5
    },
    {
      "type": "minus",
      "value": 15
    },
    {
      "type": "slice",
      "sliceValue": 100,
      "value": 12
    }
  ];
  
  private totalCart;
  private resultOffers;
  private bestOffer;
  private textDiscount;

  constructor(private cartData: CartData, private offerService : OfferService){
  }

  ngOnInit(){
    if(this.cartData.cart.length > 0){
      this.cartData.offers = this.offers;
    }
			
	this.updateData();
  }
  
  updateData(){
	  this.totalCart = this.total(this.cartData.cart);
	  this.resultOffers = this.getResultOffers(this.offers);
	  this.bestOffer = this.getMin(this.resultOffers);
	  this.textDiscount = this.getTextDiscount(this.bestOffer.type);
  }


  total(books){
    return books.reduce((acc, b) => acc + b.price, 0);
  }

  // getlistIsbn(books){
  //   return books.map(b => b.isbn);
  // }


  // getOffers(listIsbn){
  //   this.offerService.getOffer(listIsbn).subscribe((data)=>{
  //     this.cartData.offers= data['offers'];
  //   })
  // }

  removeToCart(index){
    this.cartData.cart.splice(index, 1);
    // this.getOffers(this.getlistIsbn(this.cartData.cart));
	this.updateData();
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


  getResultOffers(offers){
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
          result.calcul = this.offerService.calculMinus(this.total(this.cartData.cart), offers[i].value);
          break;
        case 'slice':
          result.calcul = this.offerService.calculSlide(this.total(this.cartData.cart), offers[i].value, offers[i].sliceValue);
          break;

      }
      result.type = offers[i].type;
	  let resultCopy = Object.assign({}, result);
      resultOffers.push(resultCopy);
    }
	return resultOffers;
  }

  getMin(resultOffers){
    return resultOffers.reduce((acc, val) => {
		if(acc.calcul === undefined || val.calcul < acc.calcul){
			acc.calcul = val.calcul;
			acc.type = val.type;
		}
      return acc;
    }, []);
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

/*  getMin(items) {
    return items.reduce((acc, val) => {
      acc[0] = ( acc[0] === undefined || val < acc[0] ) ? val : acc[0]
      return acc;
    }, []);
  }
*/

  clearCart(){
    this.cartData.cart.splice(0, this.cartData.cart.length);
  }

  textPercentage(value){
    return `-${value}%`;
  }

  textMinus(value){
    return `-${value}`;
  }

  textSlice(value, sliceValue){
    return `-${value} for each ${sliceValue}`;
  }
  
  getTextDiscount(type){
	 let bestOffer = this.offers.filter(el => el.type == type);

	 switch (bestOffer[0].type) {
          case 'percentage':
            return this.textPercentage(bestOffer[0].value);
            break;
          case 'minus':
           return this.textMinus(bestOffer[0].value);
            break;
          case 'slice':
            return this.textSlice(bestOffer[0].value, bestOffer[0].sliceValue);
            break;

        }
  }	  

}
