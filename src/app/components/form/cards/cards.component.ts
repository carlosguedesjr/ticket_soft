import {
  Component,
  OnInit,
  ViewChild,
  Input,
  SimpleChanges
} from '@angular/core';
import { EventsService } from 'src/app/services/Events.service';
import { ShoppingCartService } from 'src/app/services/ShoppingCart.service';
import { MakeResponseService } from 'src/app/helpers/make-response.services';
import { ConfigService } from 'src/app/services/Config.service';
import { FavoriteEvent } from 'src/app/interfaces/favoriteEvent';
import { TranslateService } from '@ngx-translate/core';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import { Router, ActivatedRoute } from '@angular/router';
import { FilterEventsService } from 'src/app/services/FilterEvents.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.sass', './cards.component.css']
})
export class CardsComponent implements OnInit {
  events: any;
  login: any;
  favoriteEvent: FavoriteEvent;
  Swal = Swal as any;

  pageLength = 80;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @Input() pastEvents: boolean;

  @Input() setValueFilter: any;

  constructor(
    private eventsService: EventsService,
    private configService: ConfigService,
    private shoppingCartService: ShoppingCartService,
    private makeResponseService: MakeResponseService,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private filterEventsService: FilterEventsService
  ) { }


  ngOnInit() {
    this.eventsService.currentEvent.subscribe(data => (this.events = data));
    if (!this.pastEvents) {
      this.eventsService
        .getEvents()
        .then(res => {
          this.events = res;
          console.log('sub_current: ', this.events);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.login = this.configService.login();

      if (this.login) {
        this.eventsService
          .getParticipatedEvents()
          .subscribe(res => {
            this.eventsService.changeMessage(res);
          });
        this.updateEvent();
      } else {
        this.Swal.fire({
          title: this.translate.instant('ERRORS.RESTRICT-ACCESS'),
          icon: 'warning'
        });
      }
    }

    this.filterEventsService.eventsBehavior.subscribe(res => {
      this.events = res;
    })
  }

  updateEvent() {
    this.eventsService.changeMessage(this.events);
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }


  pageChange(event) {
    console.log(event);
  }

  shareEvent(reference: number) {
    console.log(reference);
  }

  favEvent(event) {
    if (!this.pastEvents) {
      this.login = this.configService.login();

      if (this.login) {
        this.eventsService.userAddFavoriteEvent(event.id).subscribe((res) => {
        })
      } else {
        this.Swal.fire({
          title: this.translate.instant('EVENTS.NOTFAVORITEEVENT'),
          icon: 'info'
        });
      }
    }
  }

  addEvent(event) {
    if (!this.pastEvents) {
      this.shoppingCartService
        .getEventAttributes(event.id)
        .then(res => {
          if (event.attributes && event.attributes.length === 0) {
            event.attributes = this.makeResponseService.getArray(res);
          }
        })
        .catch(error => {
          console.log(error);
        });

      this.shoppingCartService
        .getEventInviteType(event.id)
        .then(res => {
          if (event.invite_type && event.invite_type.length === 0) {
            event.invite_type = this.makeResponseService.getArray(res);
          }
        })
        .catch(error => {
          console.log(error);
        });

      this.shoppingCartService
        .getEventProduct(event.id)
        .then(res => {
          if (event.products && event.products.length === 0) {
            event.products = this.makeResponseService.getArray(res);
          }
        })
        .catch(error => {
          console.log(error);
        });

      this.shoppingCartService
        .getEventOptionalProduct(event.id)
        .then(res => {
          if (event.optional_products && event.optional_products.length === 0) {
            event.optional_products = this.makeResponseService.getArray(res);
          }
        })
        .catch(error => {
          console.log(error);
        });

      event.invites = [
        {
          name: 'Nome do dono do convite',
          price: '0'
        }
      ];

      this.eventsService.addEvents(event);
    }
  }

  moreInfo(url) {
    this.router.navigate(['../evento/', url], {
      relativeTo: this.activatedRoute
    });
  }
}
