import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  filter: string;

  constructor(private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      console.log(params['filter']);
      
  });
  }

}
