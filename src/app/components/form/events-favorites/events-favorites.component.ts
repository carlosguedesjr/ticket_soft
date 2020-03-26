import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/Config.service';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/Events.service';

@Component({
  selector: 'app-events-favorites',
  templateUrl: './events-favorites.component.html',
  styleUrls: ['./events-favorites.component.css']
})

export class EventsFavoritesComponent implements OnInit {
  login: any;
  events: any;
  Swal = (Swal as any);
  constructor(private configService: ConfigService
    , private eventsService: EventsService
    , private translate: TranslateService
    , private router: Router
    , private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.login = this.configService.login();

    if (this.login) {
      this.eventsService.getFavoriteEvents().subscribe((res) => {
          this.events = res;
          console.log( res);
        });
    }
    else {
      this.Swal.fire({
        title: this.translate.instant('ERRORS.RESTRICT-ACCESS'),
        icon: 'warning'
      })
    }
  }

  moreInfo(url) {
    this.router.navigate(['../evento/', url], { relativeTo: this.activatedRoute });
  }
}