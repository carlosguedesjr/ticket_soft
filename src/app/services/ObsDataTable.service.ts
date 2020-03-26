import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class ObsDataTableService {

  static newDataTable = new EventEmitter<any>();
  static parametersDatatable = new EventEmitter<any>();
  static eventTableEmit = new EventEmitter<any>();

  constructor() { }

  changeData(data: Array<any>) {
    ObsDataTableService.newDataTable.emit(data);
  }

  getEventTable(eventType: string) {
    ObsDataTableService.eventTableEmit.emit(eventType);
  }

}
