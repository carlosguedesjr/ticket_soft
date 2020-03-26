import { Component, OnInit } from '@angular/core';
import { CategoryEventsService } from 'src/app/services/CategoryEvents.service';
import { EventsService } from 'src/app/services/Events.service';
import { ConfigService } from 'src/app/services/Config.service';
import { FavoriteEvent } from 'src/app/interfaces/favoriteEvent';
import { TranslateService } from '@ngx-translate/core';
import * as Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass', './categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  events: any;
  login: any; 
  favoriteEvent: FavoriteEvent;
  Swal = (Swal as any);

  private countLeft: number = 0;

  constructor(private categoryEventsService: CategoryEventsService
    , private configService: ConfigService
    , private eventsService: EventsService
    , private translate: TranslateService) { }

  ngOnInit() {
    this.categoryEventsService.getCategory().then((res) => {
      this.categories = res;
    }).catch((error) => {
      console.log(error);
    });
  }

  favEvent(event) {

  }

  nextLeftScroll() {
    $('.out-section-categories').animate({ scrollLeft: Math.max(0, $('.out-section-categories').scrollLeft() - 148) }, 500);
  }

  nextRightScroll() {
    $('.out-section-categories').animate({ scrollLeft: Math.max(5, $('.out-section-categories').scrollLeft() + 148) }, 500);
  }

  setCategory(category) {

  }

  scroll(el: HTMLElement, category) {
    el.scrollIntoView({ behavior: 'smooth' });
    this.setCategory(category);
  }
}
