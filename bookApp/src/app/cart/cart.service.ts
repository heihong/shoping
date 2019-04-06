import { Injectable } from '@angular/core';
import {Globals} from "../globals/globals";

@Injectable()
export class CartService {

  cart = [];

  constructor(private globals: Globals) {}

}
