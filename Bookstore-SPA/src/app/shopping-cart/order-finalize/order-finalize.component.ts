import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/_models/address';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';
import { Router } from '@angular/router';
import { OrderBook } from 'src/app/_models/order-book';

@Component({
  selector: 'app-order-finalize',
  templateUrl: './order-finalize.component.html',
  styleUrls: ['./order-finalize.component.css']
})
export class OrderFinalizeComponent implements OnInit {
  value1 = 0;
  value2= 0;
  step = 1;
  paypal = false;
  card = true;
  cardOwner: string;
  cardNumber: string;
  validDate: Date;
  cvvNumber: number;
  address = new Address();
  addresses: Address[];
  constructor(private shoppingCartService: ShoppingCartService, private router: Router) { }

  ngOnInit() {
    this.shoppingCartService.getAddresses().subscribe(x => {
      this.addresses = x;
      console.log(this.addresses);
    }, error => {
      console.log(error);
    });
  }

  finalize() {
    this.shoppingCartService.address = this.address;
    this.shoppingCartService.addOrder().subscribe(x => {
      console.log('ok');
    }, error => {
      console.log(error);
    }
      );
    this.shoppingCartService.address = new Address();
    this.shoppingCartService.orderBooks = [];
    this.shoppingCartService.paymant = '';
    this.shoppingCartService.total = 0;
    this.router.navigate(['home']);
    
  }

  chooseCard() {
    this.card = true;
    this.paypal = false;
    this.shoppingCartService.paymant = 'Card';
  }

  choosePaypal() {
    this.card = false;
    this.paypal = true;
    this.shoppingCartService.paymant = 'Paypal';
  }

  previous() {
    this.step--;
    this.progress();
  }

  next() {
    this.step++;
    this.progress();
    console.log(this.addresses);
  }

  progress() {
    console.log(this.step);
    if(this.step === 1) {
      this.value1 = 0;
      this.value2 = 0;
    }
    if(this.step > 1) {
      this.value1 = 100;
      this.value2 = 0;
    }
    if(this.step === 3) {
      this.value1 = 100;
      this.value2 = 100;
    }
  }

  chooseAddress(index: number) {
    this.address = this.addresses[index];
  }
}
