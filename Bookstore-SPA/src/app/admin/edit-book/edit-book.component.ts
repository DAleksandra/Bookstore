import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/_models/book';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  @Input() book: Book;
  @Output() leave = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  leaveBook() {
    this.leave.emit('true');
  }

}
