import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import * as moment from 'moment';
import { emiterFilterDates } from 'src/app/interfaces/emiterFilterDates';
import { FormControl } from '@angular/forms';
import { fdatasync } from 'fs';
import { AddressService } from 'src/app/services/Address.service';
import { FilterEventsService } from 'src/app/services/FilterEvents.service';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.sass', './filter-date.component.css']
})
export class FilterDateComponent implements OnInit {

  periodFilter: string;
  startDate: any;
  finishDate: any;
  formato: string = 'DD/MM/YYYY';
  paramDates = new emiterFilterDates();
  SDate = new FormControl(new Date());
  FDate = new FormControl(new Date());
  @Input() eventName: any;
  @Output() dateEvent = new EventEmitter<emiterFilterDates>();
  @Output() filteredEvents = new EventEmitter<any>();

  typeFilterDate = [
    {
      value: 'week',
      text: 'Nesta semana'
    },
    {
      value: 'month',
      text: 'Este mês'
    },
    {
      value: 'three_months',
      text: 'Próximos 3 meses'
    },
    {
      value: 'six_months',
      text: 'Próximos 6 meses'
    },
    {
      value: 'past_events',
      text: 'Eventos já realizados'
    },
  ];

  constructor(private filterService: FilterEventsService) { }

  ngOnInit() {
    
  }

  getFilterDate(event) {
    let day: number = 4;

    switch (this.periodFilter) {
      case 'week':
        this.startDate = moment().day(0).format(this.formato);
        this.finishDate = moment().day(6).format(this.formato);
        break;
      case 'month':
        this.startDate = moment().startOf('month').format(this.formato);
        this.finishDate = moment().endOf('month').format(this.formato);
        break;
      case 'three_months':
        this.startDate = moment(new Date()).format(this.formato);
        this.finishDate = moment().month(+3).format(this.formato);
        break;
      case 'six_months':
        this.startDate = moment(new Date()).format(this.formato);
        this.finishDate = moment().month(+6).format(this.formato);
        break;
      case 'past_events':
        this.startDate = null;
        this.finishDate = moment(new Date()).format(this.formato);
        break;
    }

    this.paramDates.startDate = this.startDate;
    this.paramDates.finishDate = this.finishDate;

    this.SDate = new FormControl((new Date(this.startDate)).toISOString());
    this.FDate = new FormControl((new Date(this.finishDate)).toISOString());
    this.sendCategory(this.paramDates);
  }

  sendCategory(dates) {
    this.dateEvent.emit(dates);
  }

  filterEvents() {
    this.filterService.filters('', this.eventName, this.startDate, this.finishDate, '', null)
      .subscribe(data => {
        this.filteredEvents.emit(data);
      })
  }
}
