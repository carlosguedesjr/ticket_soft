import { Component, OnInit, HostListener, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { slideShoppingCartService } from 'src/app/services/slideShoppingCart.service';
import { ShoppingCartService } from 'src/app/services/ShoppingCart.service';
import { AuthenticationService } from 'src/app/services/Auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']

})
export class NavbarComponent implements OnInit, OnDestroy {
  open: boolean = false;
  state: string = 'closed';
  isAuthenticated = false;
  qtdEventsShoppingCardBadge: number = 0;
  private qtdEventsBadgeSub: Subscription;
  private userSub: Subscription;

  protected verticalOffset: number;
  protected menu = [
    {
      text: 'PORTAL.MENU.HOME',
      icon: 'home',
      link: '/home'
    },
    {
      text: 'PORTAL.MENU.EVENTS',
      icon: 'directions_run',
      link: '/eventos'
    },
    {
      text: 'PORTAL.MENU.CONTACT',
      icon: 'mail',
      link: '/contato'
    }
  ];

  @Output() activeRouter = new EventEmitter();
  slideShoppingCartState: any;

  constructor(private router: Router,
    private slide: slideShoppingCartService,
    private authService: AuthenticationService,
    private shoppingCartService: ShoppingCartService) { }

  @HostListener("window:scroll", []) onWindowScroll() {
    this.verticalOffset = window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0;
  }

  ngOnInit() {
    slideShoppingCartService.closeShoppingCart.subscribe((eventType) => {
      this.slideShoppingCartState = eventType;
    });

    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user.idCadastro;
      console.log(`This is the user sub${JSON.stringify(user)}`);
    });


    this.shoppingCartService.atQtdBagdeEvents.subscribe(data => {
      if (data == 'SUM')
        this.qtdEventsShoppingCardBadge++;
      else
        this.qtdEventsShoppingCardBadge--;
    });
  }

  getRoute() {
    this.activeRouter.emit(this.router.url);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.qtdEventsBadgeSub.unsubscribe();
  }
}
