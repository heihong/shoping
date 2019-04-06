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


  it('should minus total with a value', ()  =>{
    expect(60).toEqual(service.calculMinus(65, 5));
  });

  it('should percentage total with a value', ()  =>{
    expect(61.75).toEqual(service.calculPercentage(65, 5));
  });

  it('should slice total with a value', ()  =>{
    expect(90).toEqual(service.calculSlide(100, 10, 100));
  });



});
