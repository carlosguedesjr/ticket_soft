import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { EventsService } from 'src/app/services/Events.service';
import { FilterEvent } from 'src/app/interfaces/filterEvents';
import { emiterFilterDates } from 'src/app/interfaces/emiterFilterDates';
import { FilterEventsService } from 'src/app/services/FilterEvents.service';
declare var $: any;


@Component({
  selector: 'app-filter-events',
  templateUrl: './filter-events.component.html',
  styleUrls: ['./filter-events.component.sass', './filter-events.component.css']
})
export class FilterEventsComponent implements OnInit {
  public events: any;
  filter: FilterEvent = new FilterEvent();
  @Output() setValueFilter = new EventEmitter();
  protected elementTarget: string;
  @Input() email: string;
  categories: any;
  paramDates = new emiterFilterDates();
  location: any;
  eventName: any;

  @ViewChild('boardfilters', { static: false }) boardfilters: ElementRef;

  constructor(private elRef: ElementRef,
    private eventsService: EventsService,
    private filterEventsService: FilterEventsService) { }

  ngOnInit() { }

  getFilter(event) {
    let idElementTarget = event.target.id;

    if (this.elementTarget === idElementTarget) {
      $('app-filter-events').removeClass('expand');
      Object.keys(event.target.children).forEach((i) => {
        if (event.target.children[i].innerText === 'keyboard_arrow_down') {
          event.target.children[i].innerText = 'keyboard_arrow_up';
        }
      });
      this.elementTarget = '';
      return false;
    }

    this.elementTarget = idElementTarget;
    $('app-filter-events').addClass('expand');
    Object.keys(event.target.children).forEach((i) => {
      if (event.target.children[i].innerText === 'keyboard_arrow_up') {
        event.target.children[i].innerText = 'keyboard_arrow_down';
      }
    });
    this.boardfilters.nativeElement.classList.add('expand');
  }


  outClickFilterEvent(event) {
    if (this.elRef.nativeElement.contains(event.target)) {
    } else {
      $('app-filter-events').removeClass('expand');
      Object.keys(event.target.children).forEach((i) => {
        if (event.target.children[i].innerText === 'keyboard_arrow_up') {
          event.target.children[i].innerText = 'keyboard_arrow_down';
        }
      });
      this.elementTarget = '';
    }
  }

  onKey(event: any) {
    this.eventName = event.target.value;
    console.log('nome evento: ', this.eventName);

    if (event.target.value.length > 2 || event.target.value.length == 0) {
      this.eventsService.changeMessage(event.target.value);
      this.filter.event = event.target.value;
      this.filter.email = this.email;
      this.filter.category = this.categories;
      this.filter.startDate = this.paramDates.startDate ? this.paramDates.startDate : null;
      this.filter.finishDate = this.paramDates.finishDate ? this.paramDates.finishDate : null;
      this.eventsService.getFilterEvent(this.filter).subscribe(((res) => {
        this.eventsService.changeMessage(res)
      }));
    }
  }

  receiveCategory(event) {
    this.categories = event;
  }

  receiveLocation(event) {
    this.location = event;
  }

  receiveDate(event) {
    this.paramDates = event;
  }
  receiveFilteredEvents(event) {
    this.events = event;
    this.filterEventsService.nextEvent(event)
  }
}
