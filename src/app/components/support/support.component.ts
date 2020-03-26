import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.sass', './support.component.css']
})
export class SupportComponent implements OnInit {

  supportList = [
    {
      img: 'https://images.sympla.com.br/5d1d0ded09220.jpg'
    },
    {
      img: 'https://images.sympla.com.br/5d1d0e44b8313.png'
    },
    {
      img: 'https://images.sympla.com.br/5d1d0ef730f0e.png'
    },
    {
      img: 'https://images.sympla.com.br/5d1d0e9faaf4a.png'
    },
    {
      img: 'https://images.sympla.com.br/5d1d0ec408fc4.png'
    },
    {
      img: 'https://images.sympla.com.br/5d1d0ed9f38d9.png'
    },
    {
      img: 'https://images.sympla.com.br/5d1d0e7e6e60b.png'
    },
    {
      img: 'https://images.sympla.com.br/5d1d0f0d1c42a.png'
    }
  ];


  constructor() { }

  ngOnInit() {
  }

}
