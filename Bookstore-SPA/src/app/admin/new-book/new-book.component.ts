import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {
  @Output() leave = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  leaveBook() {
    this.leave.emit('true');
  }


}
