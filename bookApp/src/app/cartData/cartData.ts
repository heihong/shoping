import { Injectable } from '@angular/core';
import {Book} from "../models/book.model";

@Injectable()
export class CartData {
  cart: Book[] = [];
}
