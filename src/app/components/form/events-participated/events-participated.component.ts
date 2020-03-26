import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from 'src/app/services/Config.service';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/Events.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-events-participated',
  templateUrl: './events-participated.component.html',
  styleUrls: ['./events-participated.component.sass', './events-participated.component.css']
})
export class EventsParticipatedComponent implements OnInit {
  public events: any;
  login: any;
  Swal = (Swal as any);
  tempFilterValue: string = '';
  email: string;
  tempValueFilter: any;

  constructor(private eventsService: EventsService
    , private translate: TranslateService
    , private configService: ConfigService
    , private router: Router
    , private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.login = this.configService.login();

    if (this.login) {
      this.email = this.login.email;
      this.eventsService.getParticipatedEvents().subscribe(((res) => { this.events = res }));
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
