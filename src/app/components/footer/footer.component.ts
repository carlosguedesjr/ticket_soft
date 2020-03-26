import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass', './footer.component.css']
})
export class FooterComponent implements OnInit {

  socialNetworks = [
    {
      link: '#',
      ico: 'fa-facebook'
    },
    {
      link: '#',
      ico: 'fa-twitter'
    },
    {
      link: '#',
      ico: 'fa-instagram'
    },
    {
      link: '#',
      ico: 'fa-youtube-play'
    }
  ];

  blocks = [
    {
      title: 'PARTICIPANTES',
      list: [
        {
          text: 'PORTAL.FOOTER.LOGIN',
          link: '/login'
        },
        {
          text: 'PORTAL.FOOTER.SIGNUP',
          link: '/cadastro'
        },
        {
          text: 'PORTAL.FOOTER.HELPCENTER',
          link: '#'
        },
        {
          text: 'PORTAL.FOOTER.PURCHASETERMS',
          link: '#'
        }
      ]
    },
    {
      title: 'ORGANIZADORES',
      list: [
        {
          text: 'PORTAL.FOOTER.OVERTHEPLATAFORM',
          link: '#'
        },
        {
          text: 'PORTAL.FOOTER.REQUESTAQUOTE',
          link: '#'
        },
        {
          text: 'PORTAL.FOOTER.SUPPORT',
          link: '#'
        },
        {
          text: 'PORTAL.FOOTER.BLOG',
          link: '#'
        }
      ]
    },
    {
      title: 'EMPRESA',
      list: [
        {
          text: 'PORTAL.FOOTER.WHOWEARE',
          link: '#'
        },
        {
          text: 'PORTAL.FOOTER.WORKWITHUS',
          link: '#'
        },
        {
          text: 'PORTAL.FOOTER.PRIVACYPOLICY',
          link: '#'
        }
      ]
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
