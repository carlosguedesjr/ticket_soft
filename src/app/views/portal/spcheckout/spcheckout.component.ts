import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/ShoppingCart.service';

@Component({
  selector: 'app-spcheckout',
  templateUrl: './spcheckout.component.html',
  styleUrls: ['./spcheckout.component.sass', './spcheckout.component.css']
})
export class SpcheckoutComponent implements OnInit {
  items: any;
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }
}