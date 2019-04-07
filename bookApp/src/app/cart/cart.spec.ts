import {ComponentFixture, TestBed} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartComponent } from "./cart.component";
import { FormsModule } from "@angular/forms";

//component
import { AppComponent } from '../app.component';
import { BookComponent } from "../books/book/book.component"

//service
import {Globals} from "../globals/globals";
import {FilterPipe} from "./pipe/filter.pipe";
import {BookCartComponent} from "./book/bookCart.component";



describe('CartComponent', () => {

  let httpMock : HttpTestingController;
  let globals : Globals;
  let cartComponent: ComponentFixture<CartComponent>;
  let cartComponentInstance;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        BookComponent,
        CartComponent,
        FilterPipe,
        BookCartComponent

      ],
      providers: [Globals]
    }).compileComponents()
    httpMock = TestBed.get(HttpTestingController);
    globals = TestBed.get(Globals)
    cartComponent = TestBed.createComponent(CartComponent);
    cartComponentInstance = cartComponent.componentInstance;
  });

  let books = [
    {
      "isbn": "c8fabf68-8374-48fe-a7ea-a00ccd07afff",
      "title": "Henri Potier à l'école des sorciers",
      "price": 35,
      "cover": "http://henri-potier.xebia.fr/hp0.jpg",
      "synopsis": [
        "Après la mort de ses parents (Lily et James Potier), Henri est recueilli par sa tante Pétunia (la sœur de Lily) et son oncle Vernon à l'âge d'un an. Ces derniers, animés depuis toujours d'une haine féroce envers les parents du garçon qu'ils qualifient de gens « bizarres », voire de « monstres », traitent froidement leur neveu et demeurent indifférents aux humiliations que leur fils Dudley lui fait subir. Henri ignore tout de l'histoire de ses parents, si ce n'est qu'ils ont été tués dans un accident de voiture",
        "Le jour des 11 ans de Henri, un demi-géant du nom de Rubeus Hagrid vient le chercher pour l’emmener à Poudlard, une école de sorcellerie, où il est inscrit depuis sa naissance et attendu pour la prochaine rentrée. Hagrid lui révèle alors qu’il a toujours été un sorcier, tout comme l'étaient ses parents, tués en réalité par le plus puissant mage noir du monde de la sorcellerie, Voldemort (surnommé « Celui-Dont-On-Ne-Doit-Pas-Prononcer-Le-Nom »), après qu'ils ont refusé de se joindre à lui. Ce serait Henri lui-même, alors qu'il n'était encore qu'un bébé, qui aurait fait ricocher le sortilège que Voldemort lui destinait, neutralisant ses pouvoirs et le réduisant à l'état de créature quasi-insignifiante. Le fait d'avoir vécu son enfance chez son oncle et sa tante dépourvus de pouvoirs magiques lui a donc permis de grandir à l'abri de la notoriété qu'il a dans le monde des sorciers.",
        "Henri entre donc à l’école de Poudlard, dirigée par le professeur Albus Dumbledore. Il est envoyé dans la maison Gryffondor par le « choixpeau ». Il y fait la connaissance de Ron Weasley et Hermione Granger, qui deviendront ses complices. Par ailleurs, Henri intègre rapidement l'équipe de Quidditch de sa maison, un sport collectif très populaire chez les sorciers se pratiquant sur des balais volants. Henri connaît probablement la plus heureuse année de sa vie, mais également la plus périlleuse, car Voldemort n'a pas totalement disparu et semble bien décidé à reprendre forme humaine."
      ]
    },
    {
      "isbn": "a460afed-e5e7-4e39-a39d-c885c05db861",
      "title": "Henri Potier et la Chambre des secrets",
      "price": 30,
      "cover": "http://henri-potier.xebia.fr/hp1.jpg",
      "synopsis": [
        "Henri Potier passe l'été chez les Dursley et reçoit la visite de Dobby, un elfe de maison. Celui-ci vient l'avertir que des évènements étranges vont bientôt se produire à Poudlard et lui conseille donc vivement de ne pas y retourner. Henri choisit d'ignorer cet avertissement. Le jour de son départ pour l'école, il se retrouve bloqué avec Ron Weasley à la gare de King's Cross, sans pouvoir se rendre sur le quai 9 ¾ où les attend le Poudlard Express. En dernier recours, les garçons se rendent donc à Poudlard à l'aide de la voiture volante de Monsieur Weasley et manquent de peu de se faire renvoyer dès leur arrivée à l'école pour avoir été aperçus au cours de leur voyage par plusieurs moldus.",
        "Le nouveau professeur de défense contre les forces du mal, Gilderoy Lockhart, se montre particulièrement narcissique et inefficace. Pendant ce temps, Henri entend une voix étrange en parcourant les couloirs du château, systématiquement associée à la pétrification immédiate d'un élève moldu de l'école. Dès la première attaque, un message sanglant apparaît sur l'un des murs, informant que la Chambre des secrets a été ouverte. Dumbledore et les autres professeurs (ainsi que Henri, Ron et Hermione) doivent prendre les mesures nécessaires pour trouver l'identité du coupable et protéger les élèves contre de nouvelles agressions."
      ]
    }
  ];



  it('should return total', ()  =>{
    expect(cartComponentInstance.total(books)).toEqual(65);
  })

  it('should a list of isbn', ()  =>{
    let listISbn = ['c8fabf68-8374-48fe-a7ea-a00ccd07afff', 'a460afed-e5e7-4e39-a39d-c885c05db861']
    expect(cartComponentInstance.getlistIsbn(books)).toEqual(listISbn);
  })


  it('should call getOffer and return resultCalcul percentage', ()  =>{

    // calculation percentage 65 * 5%
    let resulCalcul = 61.75;

    let bestOffer = {
      min : -1,
      index : -1
    };

    let resultbestOffer = {
      min : 61.75,
      index : 0
    };

    let indexCourant = 0;

    expect(cartComponentInstance.getOffer(bestOffer, resulCalcul, indexCourant)).toEqual(resultbestOffer);
  })

  it('should call getOffer return resultCalcul minus', ()  =>{
    // calculation minus 65 * 15
    let resultCalcul = 50;

    let bestOffer = {
      min : 61.75,
      index : 0
    };

    let resultbestOffer = {
      min: 50,
      index :1
    }

    let indexCourant = 1;

    expect(cartComponentInstance.getOffer(bestOffer, resultCalcul , indexCourant)).toEqual(resultbestOffer);
  })

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


  it('should return the best offer1', ()  =>{
    let resulBestOffer = {
      min : 50,
      index : 1
    };
    globals.totalAmount = 65;
    globals.cart = books;
    expect(cartComponentInstance.bestOffer(offers1)).toEqual(resulBestOffer);
  })



  let offers2 = [
    {
      "type": "percentage",
      "value": 30
    },
    {
      "type": "minus",
      "value": 15
    },
    {
      "type": "slice",
      "sliceValue": 80,
      "value": 14
    }
  ];

  it('should return the best offer2', ()  =>{
    let resulBestOffer = {
      min : 45.5,
      index : 0
    };
    globals.totalAmount = 65;
    globals.cart = books;
    expect(cartComponentInstance.bestOffer(offers2)).toEqual(resulBestOffer);
  })


  it('should clear the cart', ()  =>{
    globals.cart = books;
    cartComponentInstance.clearCart()
    expect(globals.cart.length).toEqual(0);
  })

  it('should return -15', ()  =>{
    globals.offers = offers1;
    globals.cart = books;
    expect(cartComponentInstance.textMinus()).toEqual('-15');
  })


  let offers3 = [
    {
      "type": "percentage",
      "value": 4
    }
  ];

  it('should return -4%', ()  =>{
    globals.offers = offers3;
    globals.cart = books;
    expect(cartComponentInstance.textPercentage()).toEqual('-4%');
  })



  let offers4 = [
    {
      "type": "slice",
      "sliceValue": 80,
      "value": 14
    }
  ];

  it('should return -4%', ()  =>{
    globals.offers = offers4;
    globals.cart = books;
    expect(cartComponentInstance.textSlice()).toEqual('-14 for each 80');
  })

});
