import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/_models/order';
import { AuthService } from 'src/app/_services/auth.service';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  @Input() order: Order;
  statusEdit: string;
  @Output() leave = new EventEmitter();

  constructor(private shoppingCartService: ShoppingCartService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.statusEdit = this.order.status;
  }

  updateOrder() {
    this.order.status = this.statusEdit;
    console.log(this.statusEdit);
    console.log(this.order);
    this.shoppingCartService.updateOrder(this.order).subscribe(x => {
      this.alertify.success("Order number " + this.order.id + " successfully updated." );
      this.leave.emit('true');
    }, error => {
      this.alertify.error("Cannot update order.");
    });
  }

  onStatusClick() {
    console.log(this.statusEdit);
  }

  deleteOrder()  {
    this.shoppingCartService.deleteOrder(this.order.id).subscribe(x => {
      this.alertify.success("Successfully deleted order.")
      this.leave.emit('true');
    }, error => {
      this.alertify.error("Cannot delete order.")
    });
  }

  leaveOrder() {
    this.leave.emit('true');
  }



}
