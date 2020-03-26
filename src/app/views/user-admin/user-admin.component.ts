import { Component, OnInit,  ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.sass', './user-admin.component.css']
})
export class UserAdminComponent implements OnInit {

  menu = [
    {
      icon: "dashboard",
      text: 'Dashboard',
      link: 'dashboard'
    },
    {
      icon: "face",
      text: 'Minha conta',
      link: 'perfil'
    },
    {
      icon: "date_range",
      text: 'Meus eventos',
      link: 'eventosPassados'
    },
    {
      icon: "favorite",
      text: 'Eventos favoritos',
      link: 'eventosfavoritos'
    },
    {
      icon: "exit_to_app",
      text: 'Sair',
      link: 'logout'
    },
    {
      icon: "location_city",
      text: 'Empresas',
      link: 'empresas'
    },
  ]

  @ViewChild('nav', {static: false}) nav: ElementRef;

  constructor(private router: Router) { 
   // this.router.navigate(["/admin/dashboard"]);
  }

  ngOnInit() {
  }

  activeRoute(event) {
    const listElement = this.nav.nativeElement.children;

    Object.keys(listElement).map((i) => {
      if(listElement[i].classList.contains('active')) {
        listElement[i].classList.remove('active');
      }
    });

    event.target.classList.add('active');
  }
}
