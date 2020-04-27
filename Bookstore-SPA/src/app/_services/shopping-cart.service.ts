import { Injectable } from '@angular/core';
import { Book } from '../_models/book';
import { OrderBook } from '../_models/order-book';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Address } from '../_models/address';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
orderBooks: OrderBook[] = [];
total: number;
taxes: number = 12;
shipping: number = 15;
paymant: string;
address: Address;
baseUrl: string = 'http://localhost:5000/api/';

constructor(private http: HttpClient, private authService: AuthService) {
 }

  addOrder() {
    console.log({Books: this.orderBooks, Status: 'placed', TotalPrice: this.total, ChoosedAddress: this.address, PaymentMethod: this.paymant});
    return this.http.post(this.baseUrl + this.authService.decodedToken.nameid + '/orders',
    {Books: this.orderBooks, Status: 'placed', TotalPrice: this.total, FirstName: this.address.firstName, LastName: this.address.lastName, 
    Street: this.address.street, HomeNumber: this.address.homeNumber, PostNumber: this.address.postNumber, 
    City: this.address.city, PaymentMethod: this.paymant});
    
  }

  getAddresses() {
    return this.http.get<Address[]>(this.baseUrl + this.authService.decodedToken.nameid + '/orders/address').pipe(
      map(response => {
        return response;
      })
    );
  }

}
