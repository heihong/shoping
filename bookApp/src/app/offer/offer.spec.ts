import { TestBed } from '@angular/core/testing';

//service
import {OfferService} from "./offer.service";



describe('OfferService', () => {

  let service : OfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferService]
    });
    service = TestBed.get(OfferService);
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
  ];

  it('should subtract total with a value', ()  =>{
    expect(50).toEqual(service.calculMinus(65, 15));
  });

  it(`should return the result from total's percentage`, ()  =>{
    expect(61.75).toEqual(service.calculPercentage(65, 5));
  });

  it('should subtract total for each sliceValue', ()  =>{
    expect(65).toEqual(service.calculSlide(65, 12, 100));
  });

  // it('should retrieve offer from the API via GET', ()  =>{
  //   let offers1 = [
  //     {
  //       "type": "percentage",
  //       "value": 4
  //     },
  //     {
  //       "type": "minus",
  //       "value": 15
  //     },
  //     {
  //       "type": "slice",
  //       "sliceValue": 100,
  //       "value": 12
  //     }
  //   ]
  //   let listIsbn = ['c8fabf68-8374-48fe-a7ea-a00ccd07afff', 'a460afed-e5e7-4e39-a39d-c885c05db861'];
  //   service.getOffer(listIsbn).subscribe(offer=>{
  //     expect(offer).toEqual(offers1);
  //   })
  //
  //   const request  = httpMock.expectOne('http://henri-potier.xebia.fr/books/c8fabf68-8374-48fe-a7ea-a00ccd07afff,a460afed-e5e7-4e39-a39d-c885c05db861/commercialOffers');
  //   expect(request.request.method).toBe('GET');
  //
  //   request.flush(offers1);
  //
  // });


});
