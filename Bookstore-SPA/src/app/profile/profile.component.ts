import { Component, OnInit } from '@angular/core';
import { Address } from '../_models/address';
import { ShoppingCartService } from '../_services/shopping-cart.service';
import { AlertifyService } from '../_services/alertify.service';
import { Order } from '../_models/order';
import { BooksService } from '../_services/books.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  passwordTab: boolean = false;
  contactTab: boolean = false;
  addressesTab: boolean = true;
  newAddressTab: boolean = false;
  editAddressTab: boolean = false;
  ordersTab: boolean = false;
  orderViewTab: boolean = false;
  address = new Address();
  order = new Order();
  orders: Order[];
  addresses: Address[];
  registerForm: FormGroup;
  loaded: boolean = true;

  constructor(private shoppingCartService: ShoppingCartService, private alertify: AlertifyService, private bookService: BooksService,
              private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.getAddresses();
    this.getOrders();

    this.registerForm = this.fb.group({
      currentPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      passwordConfirm: ['', Validators.required],

    }, {validator: this.passwordMatchValidator});
  }

  changePassword() {
    this.loaded = false;
    this.authService.changePassword(this.registerForm.get('currentPassword').value, this.registerForm.get('password').value).
    subscribe(x => {
      this.alertify.success("Password successfully changed.")
      this.registerForm.reset();
      this.loaded = true;
    }, error => {
      this.alertify.error("Password cannot be changed. Check if you apply valid password.");
      this.loaded = true;
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : {'mismatch': true};
  }

  getAddresses() {
    this.shoppingCartService.getAddresses().subscribe(x => {
      this.addresses = x;
    }, error => {
      console.log(error);
    });
  }

  getOrders() {
    this.shoppingCartService.getOrders().subscribe(x => {
      this.orders = x;
    }, error => {
      console.log(error);
    });
  }

  passwordOn() {
    this.passwordTab = true;
    this.contactTab = false;
    this.addressesTab = false;
    this.newAddressTab = false;
    this.editAddressTab = false;
    this.ordersTab = false;
    this.orderViewTab = false;
  }

  contactOn() {
    this.passwordTab = false;
    this.contactTab = true;
    this.addressesTab = false;
    this.newAddressTab = false;
    this.editAddressTab = false;
    this.ordersTab = false;
    this.orderViewTab = false;
  }

  addressesOn() {
    this.passwordTab = false;
    this.contactTab = false;
    this.addressesTab = true;
    this.newAddressTab = false;
    this.editAddressTab = false;
    this.ordersTab = false;
    this.orderViewTab = false;
  }

  newAddressOn() {
    this.address = new Address();
    this.passwordTab = false;
    this.contactTab = false;
    this.addressesTab = false;
    this.newAddressTab = true;
    this.editAddressTab = false;
    this.ordersTab = false;
    this.orderViewTab = false;
  }

  editAddressOn(addr: Address) {
    this.passwordTab = false;
    this.contactTab = false;
    this.addressesTab = false;
    this.newAddressTab = false;
    this.editAddressTab = true;
    this.ordersTab = false;
    this.orderViewTab = false;

    this.address = addr;
  
  }

  ordersOn() {
    this.passwordTab = false;
    this.contactTab = false;
    this.addressesTab = false;
    this.newAddressTab = false;
    this.editAddressTab = false;
    this.ordersTab = true;
    this.orderViewTab = false;
  }

  newAddress() {
    
    this.shoppingCartService.addAddress(this.address).subscribe(x => {
      this.alertify.success("Address successfully added.");
      this.addressesOn();
      this.getAddresses();
      this.address = new Address();
    }, error => {
      this.alertify.error("Cannot add address!");
    });

  }

  editAddress() {
    this.shoppingCartService.updateAddress(this.address).subscribe(x => {
      this.alertify.success("Address successfully added.");
      this.addressesOn();
      this.getAddresses();
      this.address = new Address();
    }, error => {
      this.alertify.error("Cannot update address!");
    });

  }

  deleteAddress() {
    this.shoppingCartService.deleteAddress(this.address.id).subscribe(x => {
      this.alertify.success("Address successfully deleted.");
      this.addressesOn();
      this.getAddresses();
      this.address = new Address();
    }, error => {
      this.alertify.error("Cannot delete the address!");
    });
  }

  viewOrderOn(order: Order) {
    this.passwordTab = false;
    this.contactTab = false;
    this.addressesTab = false;
    this.newAddressTab = false;
    this.editAddressTab = false;
    this.ordersTab = false;
    this.orderViewTab = true;
    this.order = order;
    const i = this.order.books.length;
    
    for (let a = 0; a < i; a++) {
      this.bookService.getBook(this.order.books[a].bookId).subscribe(x => {
        this.order.books[a].book = x;
      }, error => {
        console.log(error);
      });
    }
  }


}
