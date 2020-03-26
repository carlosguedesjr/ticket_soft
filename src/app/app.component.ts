import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/Auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass', './app.component.css']
})
export class AppComponent implements OnInit {

  title = 'tickets';
  routerActive: any;
  currentRoute: string;

  activeFullWidth = {
    newsletter: ['/home'],
    support: ['/home']
  };

  inactiveComponent = [
    '/login'
  ];

  constructor(
    private translate: TranslateService,
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute
  ) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.currentRoute = event['url'];
    });

    /** Translate */
    translate.addLangs(['pt-br']);
    translate.setDefaultLang('pt-br');
    translate.use('pt-br');
  }

  ngOnInit() {
    this.authService.autoLogin();
  }

  getActiveRouter(router) {
    this.routerActive = router;
  }

  checkActiveFullWidth(board: string): boolean {
    let check = false;

    Object.keys(this.activeFullWidth).map((e, i) => {
      if (e === board) {
        this.activeFullWidth[e].map((ar) => {
          if (ar === this.currentRoute) {
            check = true;
          }
        })
      }
    });
    return check;
  }

  showFullWith(board: string): boolean {
    return this.checkActiveFullWidth(board);
  }

  hideComponent(): boolean {
    let inactive = true;
    this.inactiveComponent.map((e) => {
      if (e === this.currentRoute) {
        inactive = false;
      }
    })
    return inactive;
  }
}
