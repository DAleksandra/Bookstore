import { Injectable } from '@angular/core';
import { Book } from '../_models/book';
import { OrderBook } from '../_models/order-book';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Address } from '../_models/address';
import { map } from 'rxjs/operators';
import { Order } from '../_models/order';

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

  getOrders() {
    return this.http.get<Order[]>(this.baseUrl + this.authService.decodedToken.nameid + '/orders').pipe(
      map(response => {
        return response;
      })
    );
  }


  updateAddress(address: Address)
  {
    return this.http.put(this.baseUrl + this.authService.decodedToken.nameid + '/orders/address/' + address.id, address);
  }

  addAddress(address: Address)
  {
    return this.http.post(this.baseUrl + this.authService.decodedToken.nameid + '/orders/address', address);
  }

  deleteAddress(id: number) {
    return this.http.delete(this.baseUrl + this.authService.decodedToken.nameid + '/orders/address/' + id);
  }

}
