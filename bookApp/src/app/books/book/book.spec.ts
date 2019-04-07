import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "../../app.component";
import {BookComponent} from "./book.component";
import {Globals} from "../../globals/globals";

describe('BookComponent', () => {

  let globals : Globals;
  let bookComponent : ComponentFixture<BookComponent>;
  let bookComponentInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        BookComponent,
      ],
      providers: [Globals]
    })

    globals = TestBed.get(Globals);
    bookComponent = TestBed.createComponent(BookComponent);
    bookComponentInstance = bookComponent.componentInstance;
  })

  it('should add to cart', ()  =>{
    globals.cart = [
      {
        "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
        "title": "Henri Potier à l'école des sorciers",
        "price": 35,
        "cover": "http://henri-potier.xebia.fr/hp0.jpg",
        "synopsis": [
          "Après la mort de ses parents"
        ]
      },
      {
        "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
        "title": "Henri Potier et la Chambre des secrets",
        "price": 30,
        "cover": "http://henri-potier.xebia.fr/hp1.jpg",
        "synopsis": [
          "Henri Potier passe l'été chez les Dursley et reçoit la visite de Dobby, un elfe de maison."
        ]
      }];
    let book = {
      "isbn": "c30968db-cb1d-442e-ad0f-80e37c077f89",
      "title": "Henri Potier et la Coupe de feu",
      "price": 29,
      "cover": "http://henri-potier.xebia.fr/hp3.jpg",
      "synopsis": [
        "Juste avant d'assister à la coupe du Monde ",
      ]
    };
    bookComponentInstance.addToCart(book);
    expect(globals.cart.length).toEqual(3);
  });

})
