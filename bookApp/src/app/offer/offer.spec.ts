import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

//component
import { AppComponent } from '../app.component';
import {BookComponent} from "./../book/book.component";

//service
import {OfferService} from "./offer.service";


describe('AppComponent', () => {

  let service : OfferService;
  let httpMock : HttpTestingController;

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
