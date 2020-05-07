import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/_models/order';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css']
})
export class EditOrderComponent implements OnInit {
  @Input() order: Order;
  @Output() leave = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  updateOrder() {
    this.leave.emit('true');
  }

  leaveOrder() {
    this.leave.emit('true');
  }



}
