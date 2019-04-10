import { FilterPipe } from "./filter.pipe"

describe('FilterPipe', () => {
  let pipe : FilterPipe;

  beforeEach(() => {
    pipe = new FilterPipe()
  })

  it('should return Henri Potier et la Chambre des secrets', ()  =>{
    let books = [
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
    let result = [{
      "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
      "title": "Henri Potier et la Chambre des secrets",
      "price": 30,
      "cover": "http://henri-potier.xebia.fr/hp1.jpg",
      "synopsis": [
        "Henri Potier passe l'été chez les Dursley et reçoit la visite de Dobby, un elfe de maison."
      ]
    }];
    expect(pipe.transform(books, `Henri Potier et la Chambre des secrets`)).toEqual(result);
  });

  it('should return []', ()  =>{
    let books;
    expect(pipe.transform(books, `Henri Potier et la Chambre des secrets`)).toEqual([]);
  });

  it('should return books', ()  =>{
    let books = [
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
    expect(pipe.transform(books, '')).toEqual(books);
  });


})
