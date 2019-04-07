import {ComponentFixture, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "../../app.component";
import {Globals} from "../../globals/globals";
import {BookCartComponent} from "./bookCart.component";

describe('BookCartComponent', () => {
  let globals : Globals;
  let bookCartComponent : ComponentFixture<BookCartComponent>;
  let bookCartComponentInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent,
        BookCartComponent,
      ],
      providers: [Globals]
    })

    globals = TestBed.get(Globals);
    bookCartComponent = TestBed.createComponent(BookCartComponent);
    bookCartComponentInstance = bookCartComponent.componentInstance;
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
    bookCartComponentInstance.removeToCart(1);
    expect(globals.cart.length).toEqual(1);
  });
})
