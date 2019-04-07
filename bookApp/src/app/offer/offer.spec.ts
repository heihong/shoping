import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

//component
import { AppComponent } from '../app.component';
import {BooksComponent} from "../books/books.component";
import {BookComponent} from "../books/book/book.component";

//service
import {OfferService} from "./offer.service";
import {FormsModule} from "@angular/forms";
import {FilterPipe} from "../cart/pipe/filter.pipe";



describe('AppComponent', () => {

  let service : OfferService;
  let httpMock : HttpTestingController;

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
      providers: [OfferService]
    });

    service = TestBed.get(OfferService);
    httpMock = TestBed.get(HttpTestingController);
  });


  // offer 1

  let offers1 = [
    {
      "type": "percentage",
      "value": 4
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
  ]

  it('should minus total with a value', ()  =>{
    expect(50).toEqual(service.calculMinus(65, 15));
  });

  it('should percentage total with a value', ()  =>{
    expect(61.75).toEqual(service.calculPercentage(65, 5));
  });

  it('should slice total with a value', ()  =>{
    expect(65).toEqual(service.calculSlide(65, 12, 100));
  });



});