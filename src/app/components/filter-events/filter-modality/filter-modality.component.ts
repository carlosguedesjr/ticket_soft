import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CategoryEventsService } from 'src/app/services/CategoryEvents.service';
import { ConfigService } from 'src/app/services/Config.service';
import { filterCategory } from 'src/app/interfaces/filterCategories';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterEventsService } from 'src/app/services/FilterEvents.service';

@Component({
  selector: 'app-filter-modality',
  templateUrl: './filter-modality.component.html',
  styleUrls: ['./filter-modality.component.sass', './filter-modality.component.css']
})

export class FilterModalityComponent implements OnInit {

  categoriesFilter: any;
  categoriesFilterOrder: any;
  public filter: string = null;
  categories: any;
  sessionFilter: any;
  filterCategory = new filterCategory;
  formMoadality: FormGroup;
  allFilters: any;
  sessionChecked: boolean;
  @Output() categoriesEvent = new EventEmitter<string>();
  @Output() filteredEvents = new EventEmitter<any>();
  @Input() eventName: any;


  constructor(public categoryEventsService: CategoryEventsService
    , public configService: ConfigService
    , private fb: FormBuilder
    , private filterService: FilterEventsService) { }

  ngOnInit() {
    let session = this.getItemSession();

    this.categoryEventsService.getCategory().then((res) => {
      this.categoriesFilter = res;
      this.categoriesFilterOrder = this.categoriesFilter.sort((a, b) => (a.order > b.order) ? 1 : -1);
    }).catch((error) => {
      console.log(error);
    });



    session.categories.forEach((el, i) => {
      console.log('el: ', el);

    });

    // this.formMoadality = this.fb.group({

    // })

    this.categoriesFilterOrder.map((el, i) => {
      el.checked = session.includes(el.type) ? true : false;
      console.log('el: ', el);
      console.log('chekced: ', el.checked);

      this.categoriesFilterOrder.forEach(function (value) {
        console.log('value: ', value);
      });
    });
  }


  setCategory(category) {


    this.setValuesfilter(category);

    if (this.filter) {
      if (this.filter.includes(category.type))
        this.filter = this.filter.replace(',' + category.type, '').replace(category.type, '');
      else {
        if (this.filter)
          this.filter += ',' + category.type;
        else
          this.filter = category.type;
      }
      this.filter = this.filter.replace(',,', ',');
      if (this.filter.substr(0, 1) == ',')
        this.filter = this.filter.substring(1, this.filter.length);
    } else
      this.filter = category.type;

    this.sendCategory(this.filter);
  }

  sendCategory(filter) {

    this.categoriesEvent.emit(filter);
  }

  setCategorySession(category) {
    this.setItemSession(category);
  }




  // Inicio Componente Genérico
  getLogin() {
    let arq = JSON.parse(window.sessionStorage.getItem(this.configService.userData));
    return arq.email;
  }

  getItemSession() {
    let arq = JSON.parse(window.sessionStorage.getItem(this.configService.userData));
    if (arq && arq.email == this.getLogin())
      return arq;
    else
      return null;
  }

  setItemSession(categories: any) {

    let login = this.getLogin()
    let session = this.getItemSession();
    if (!session) {
      this.filterCategory.email = login;
      if (this.filterCategory.categories)
        this.filterCategory.categories.push(categories);
      else {
        this.filterCategory.categories = [];
        this.filterCategory.categories.push(categories);
      }
      window.sessionStorage.setItem(this.configService.sessionFilter, JSON.stringify(this.filterCategory));
    }
    else {
      session.email = login;
      if (session.categories)
        session.categories.push(categories);
      else {
        session.categories = [];
        session.categories.push(categories);
      }
      window.sessionStorage.setItem(this.configService.sessionFilter, JSON.stringify(session));
    }
  }

  setValuesfilter(filter) {
    // this.filterCategory = this.getItemSession();

    // if (this.sessionFilter) {
    //   if (this.sessionFilter.includes(filter))
    //     this.sessionFilter.splice(filter)
    //   else
    //     this.sessionFilter.filter.push(filter);
    // }
    // else {
    //   this.setItemSession('['+filter+']');
    // }

    //returns array of checkboxes, which we can convert into values using map()

    let cat = {
      'type': filter.type
    }
    var a = this.setItemSession(cat);
  }

  getValuesFilter() {
    return this.sessionFilter = this.getItemSession();
  }

  // Fim Componente Genérico



  filterEvents() {
    this.filterService.filters(this.filter, this.eventName,'','','',null)
      .subscribe(data => {
        this.filteredEvents.emit(data);
      })
  }
}
