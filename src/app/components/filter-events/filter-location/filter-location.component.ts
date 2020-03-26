import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddressService } from 'src/app/services/Address.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FilterEventsService } from 'src/app/services/FilterEvents.service';

@Component({
  selector: 'app-filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: ['./filter-location.component.sass', './filter-location.component.css']
})
export class FilterLocationComponent implements OnInit {
  states: any;
  cities: any;
  state: any;
  filtersLocationForm: FormGroup;
  @Output() filteredEvents = new EventEmitter<any>();
  @Input() eventName: string;

  constructor(private addressService: AddressService
    , private fb: FormBuilder
    , private filterService: FilterEventsService) { }

  ngOnInit() {
   
    this.filtersLocationForm = this.fb.group({
      country: [27],
      state: ['',],
      city: ['']
    });

    this.addressService.getStates(27).then((res) => {
      this.states = res
    });
  }

  searchCity(state) {
    this.addressService.getCitys(state).then((res) => {
      this.cities = res;
    })

  }
  emitValueSelected(value) {
    this.addressService.getCitys( this.filtersLocationForm.value['state']).then((res)=>{
      this.cities = res;
    })
  }

  filterEvents() {
    this.filterService.filters('',this.eventName,'','',this.filtersLocationForm.value['state'], this.filtersLocationForm.value['city'])
      .subscribe(data => {
        this.filteredEvents.emit(data);
      })
  }

}
