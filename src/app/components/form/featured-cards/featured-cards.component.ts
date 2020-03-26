import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/Events.service';
import { ShoppingCartService } from 'src/app/services/ShoppingCart.service';
import { MakeResponseService } from 'src/app/helpers/make-response.services';
import { ConfigService } from 'src/app/services/Config.service';
import { FavoriteEvent } from 'src/app/interfaces/favoriteEvent';
import * as Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material';
import { EventService } from 'src/app/services/Event.service';
import { MessagingComponent } from '../../messaging/messaging.component';

@Component({
  selector: 'app-featured-cards',
  templateUrl: './featured-cards.component.html',
  styleUrls: ['./featured-cards.component.sass', './featured-cards.component.css']
})

export class FeaturedCardsComponent implements OnInit {
  events: any;
  products: any;
  attributes: any;
  inviteType: any;
  login: any;
  favoriteEvent: FavoriteEvent;
  Swal = (Swal as any);

  constructor(private router: Router
    , public dialog: MatDialog
    , private activatedRoute: ActivatedRoute
    , public eventService: EventService
    , private eventsService: EventsService
    , private configService: ConfigService
    , private shoppingCartService: ShoppingCartService
    , private makeResponseService: MakeResponseService
    , private translate: TranslateService) { }

  ngOnInit() {
    this.login = this.configService.login();

    this.eventsService.getEventsFeature().then((res) => {
      this.events = res; 
    }).catch((error) => {
      console.log(error);
    });
  }


  shareEvent(reference: number) {
    // console.log(reference);
  }

  favEvent(reference: number) {
    // console.log(reference);
  }

  moreInfo(url) {
    this.router.navigate(['../evento/', url], { relativeTo: this.activatedRoute });
  }

  addFavorite(event) {
    if (this.login) {
  
      this.eventsService.userAddFavoriteEvent(event.id).subscribe((res)=>{
      })
    }
    else {
      this.Swal.fire({
        title: this.translate.instant('EVENTS.NOTFAVORITEEVENT'),
        icon: 'info'
      })
    }
  }

  addEvent(event) {
    this.shoppingCartService.getEventProduct(event.id).then((res) => {
      if (event.products && event.products.length === 0) {
        event.products = this.makeResponseService.getArray(res)
      }
    }).catch((error) => {
      console.log(error);
    });

    this.shoppingCartService.getEventOptionalProduct(event.id).then((res) => {
      if (event.optional_products && event.optional_products.length === 0) {
        event.optional_products = this.makeResponseService.getArray(res)
      }
    }).catch((error) => {
      console.log(error);
    });

    this.shoppingCartService.getEventAttributes(event.id).then((res) => {
      if (event.eventAttributes && event.eventAttributes.length === 0) {
        event.eventAttributes = this.makeResponseService.getArray(res);
      }
    }).catch((error) => {
      console.log(error);
    });

    this.shoppingCartService.getEventInviteType(event.id).then((res) => {
      if (event.invite_type && event.invite_type.length === 0) {
        event.invite_type = this.makeResponseService.getArray(res);
      }
    }).catch((error) => {
      console.log(error);
    });

    this.shoppingCartService.getEventProduct(event.id).then((res) => {
      if (event.products && event.products.length === 0) {
        event.products = this.makeResponseService.getArray(res);
      }
    }).catch((error) => {
      console.log(error);
    });

    this.shoppingCartService.getEventOptionalProduct(event.id).then((res) => {
      if (event.optional_products && event.optional_products.length === 0) {
        event.optional_products = this.makeResponseService.getArray(res);
      }
    }).catch((error) => {
      console.log(error);
    });

    event.invites = [{
      'name': 'Nome do dono do convite',
      'price': '0'
    }];

    console.log(event);

    this.eventsService.addEvents(event);
  }

  soldOffEvent(event): void {
    const dialogRef = this.dialog.open(MessagingComponent, {
      width: '800px',
      data: {
        "typeMessage": 'IE'
        , "event_id": event.id
        , "title": 'Ingressos esgotados'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}