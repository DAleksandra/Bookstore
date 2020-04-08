import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  items: string[] = [
    'All',
    'Action and adventure',
    'Crime and detective',
    'Fantasy',
    'Horror',
    'Romance',
  ];

  ngOnInit() {
  }

}
