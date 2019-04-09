import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

//component
import { AppComponent } from '../app.component';
import { BooksComponent} from "./books.component";
import { BookComponent } from "../book/book.component"

//service
import {BooksService} from "./books.service";

//model
import { Book } from "../models/book.model";

//filter
import {FilterPipe} from "../cart/pipe/filter.pipe";
import {Globals} from "../globals/globals";



describe('BooksService', () => {

  let globals : Globals;
  let booksService : BooksService;
  let httpMock : HttpTestingController;
  let booksComponent : ComponentFixture<BooksComponent>;
  let booksComponentInstance;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        BooksComponent,
        BookComponent,
        FilterPipe
      ],
      providers: [BooksService, Globals]
    });
    globals = TestBed.get(Globals);
    booksService = TestBed.get(BooksService);
    httpMock = TestBed.get(HttpTestingController);
    booksComponent = TestBed.createComponent(BooksComponent);
    booksComponentInstance = booksComponent.componentInstance;
  });

  afterEach(()=>{
    httpMock.verify();
  })
  const bookMockData : Book[] = [
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
    },
    {
      "isbn": "fcd1e6fa-a63f-4f75-9da4-b560020b6acc",
      "title": "Henri Potier et le Prisonnier d'Azkaban",
      "price": 30,
      "cover": "http://henri-potier.xebia.fr/hp2.jpg",
      "synopsis": [
        "Durant l'été, pour son treizième",
      ]
    },
    {
      "isbn": "c30968db-cb1d-442e-ad0f-80e37c077f89",
      "title": "Henri Potier et la Coupe de feu",
      "price": 29,
      "cover": "http://henri-potier.xebia.fr/hp3.jpg",
      "synopsis": [
        "Juste avant d'assister à la coupe du Monde ",
      ]
    }
  ];

  it('should retrieve books from the API via GET', ()  =>{

    booksService.getBooks().subscribe(books=>{
      expect(books.length).toBe(4);
      expect(books).toEqual(bookMockData);
    })

    const request  = httpMock.expectOne(booksService.booksUrl);
      expect(request.request.method).toBe('GET');

      request.flush(bookMockData);

  });

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
    booksComponentInstance.addToCart(book);
    expect(globals.cart.length).toEqual(3);
  });

});
