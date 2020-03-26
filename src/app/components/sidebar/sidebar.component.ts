import { ControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NavbarService } from '../../services/Navbar.service';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit, AfterViewInit {

  private JSON: Array<any> = [
    {
      name: 'Dashboard',
      route: '/dashboard',
      icon: 'dashboard'
    },
    {
      name: 'Eventos',
      icon: 'event_note',
      submodule: [
        {
          name: 'Agenda',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        }
      ]
    },
    {
      name: 'Marketing',
      icon: 'poll',
      submodule: [
        {
          name: 'Campanhas',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Leads',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        }
      ]
    },
    {
      name: 'Comercial',
      icon: 'business_center',
      submodule: [
        {
          name: 'Clientes',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Fornecedores',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Representantes',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Serviços',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Contas',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Planos de Contas',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Cotações',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Contratos',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        }
      ]
    },
    {
      name: 'Financeiro',
      icon: 'credit_card',
      submodule: [
        {
          name: 'Emissão Boletos',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Contas a pagar',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Contas a receber',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Agências Bancárias',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
      ]
    },
    {
      name: 'Fiscal',
      icon: 'receipt',
      submodule: [
        {
          name: 'Emitir NFSe',
          route: '/nfe',
          icon: 'chevron_right'
        }
      ]
    },
    {
      name: 'Minha Empresa',
      icon: 'domain',
      submodule: [
        {
          name: 'Perfil Empresarial',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Usuários',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Perfil',
          route: '/cfe-sat2',
          icon: 'chevron_right'
        },
        {
          name: 'Cadastros',
          icon: 'library_books',
          submodule: [
            {
              name: 'Moedas',
              route: '/cfe-sat2',
              icon: 'chevron_right'
            },
            {
              name: 'Endereços',
              route: '/cfe-sat2',
              icon: 'chevron_right'
            },
            {
              name: 'Cidades',
              route: '/cfe-sat2',
              icon: 'chevron_right'
            },
            {
              name: 'Estados',
              route: '/cfe-sat2',
              icon: 'chevron_right'
            },
            {
              name: 'Países',
              route: '/cfe-sat2',
              icon: 'chevron_right'
            },
          ]
        },
        {
          name: 'Configurações',
          icon: 'settings',
          submodule: [
            {
              name: 'Envio de mensagens',
              route: '/cfe-sat2',
              icon: 'chevron_right'
            },
          ]
        }
      ]
    }
  ];

  user = 'https://demos.creative-tim.com/material-dashboard-pro-angular2/assets/img/faces/avatar.jpg';
  userName = 'Maria Clementina';
  minisidenav: boolean;
  @ViewChild('nav', {static: false}) nav: ElementRef;

  constructor(
    private mScrollbarService: MalihuScrollbarService,
  ) { }

  closeAllSubMenus() {
    const child = this.nav.nativeElement.children;
  }

  closeFirstElements() {
    const child = this.nav.nativeElement.children;
    Object.keys(child).forEach((key) => {
      if (child[key].classList.contains('open')) { 
         child[key].classList.remove('open');
         Object.keys(child[key].children[1].children).forEach((e) => {
          if (child[key].children[1].children[e].classList.contains('sopen')) {
            child[key].children[1].children[e].classList.remove('sopen');
          }
        });
      }
    });
  }

  closeSecondElements() {
    const child = this.nav.nativeElement.children;
    Object.keys(child).forEach((key) => {
      if (child[key].classList.contains('open')) {
        Object.keys(child[key].children[1].children).forEach((e) => {
          if (child[key].children[1].children[e].classList.contains('sopen')) {
            child[key].children[1].children[e].classList.remove('sopen');
          }
        });
      }
    });
  }

  ngOnInit() {
    NavbarService.toggleSidenav.subscribe((sidenavMini) => {
      this.minisidenav = sidenavMini;
      this.closeAllSubMenus();
    });
  }

  ngAfterViewInit() {
    this.mScrollbarService.initScrollbar('#sidebar', { axis: 'y', theme: 'minimal' });
  }

  eventClick(event) {
    event.preventDefault();
    
    const isFirstElement = event.target.closest('li').classList.contains('sub');
    const isFirstElementActive = event.target.closest('li').classList.contains('open');

    const isSecondElement = event.target.closest('li').classList.contains('two-sub');
    const isSecondElementActive = event.target.closest('li').classList.contains('sopen');

    if (isFirstElement && !isFirstElementActive) {
      this.closeFirstElements();
      event.target.closest('li').classList.add('open');
    }
    
    if(isFirstElement && isFirstElementActive) {
      event.target.closest('li').classList.remove('open');
    }

    if (isSecondElement && !isSecondElementActive) {
      this.closeSecondElements();
      event.target.closest('li').classList.add('sopen');
    }

    if(isSecondElement && isSecondElementActive) {
      event.target.closest('li').classList.remove('sopen');
    }
  }
}
