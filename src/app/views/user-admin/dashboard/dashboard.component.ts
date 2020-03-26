import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/Config.service';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { TranslateService } from '@ngx-translate/core';
import { DashboardService } from 'src/app/services/Dashboard.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from 'src/app/services/Events.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass', './dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  login: any;
  Swal = (Swal as any);
  events: any;
  statusProgressBar: boolean = false;

  constructor(private configService: ConfigService
    , private translate: TranslateService
    , private router: Router
    , private activatedRoute: ActivatedRoute
    , private eventService: EventsService
    , private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  moreInfo(url) {
    this.router.navigate(['../evento/', url], { relativeTo: this.activatedRoute });
  }

  favoriteEvents() {
    this.login = this.configService.login();

    if (this.login) {
      this.eventService.getFavoriteEvents()
      .subscribe((res) => {
        this.events = res;     
      });
    }
    else {
      this.Swal.fire({
        title: this.translate.instant('ERRORS.RESTRICT-ACCESS'),
        icon: 'warning'
      })
    }
  }

  canceledEvents() {
    
    this.login = this.configService.login();

    if (this.login) {
      this.dashboardService.lstCanceledEvents(this.login["email"]).then((res) => {
        this.events = res;
      }).catch((error) => {
        console.log(error);
      });
    }
    else {
      this.Swal.fire({
        title: this.translate.instant('ERRORS.RESTRICT-ACCESS'),
        icon: 'warning'
      })
    }
  }

  activeEvents() {
    
    this.login = this.configService.login();

    if (this.login) {
      this.dashboardService.lstActiveEvents(this.login["email"]).then((res) => {
        this.events = res;
    
      }).catch((error) => {
        console.log(error);
      });
    }
    else {
      this.Swal.fire({
        title: this.translate.instant('ERRORS.RESTRICT-ACCESS'),
        icon: 'warning'
      })
    }
  }
}
