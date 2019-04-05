import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

//component
import { AppComponent } from '../app.component';
import {BookComponent} from "./../book/book.component";

//service
import {CartService} from "./cart.service";


describe('AppComponent', () => {

  let httpMock : HttpTestingController;
  let cartService : CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        BookComponent
      ],
      providers: [CartService]
    });

    cartService = TestBed.get(CartService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add book to cart', ()  =>{
    let book = {
        "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
        "title": "Henri Potier à l'école des sorciers",
        "price": 35,
        "cover": "http://henri-potier.xebia.fr/hp0.jpg",
        "synopsis": [
          "Après la mort de ses parents"
        ]
      };
    cartService.addToCart(book);
    expect(cartService.cart.length).toEqual(1);
    expect(cartService.cart).toEqual([book]);
  });


});
