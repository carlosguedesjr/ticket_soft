import { Injectable } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { of, Observable, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ObsDataTableService } from './ObsDataTable.service';

@Injectable()
export class DataTableService extends DataSource<any> {

  private data: any;

  constructor(
    private http?: HttpClient,
  ) {
    super();
    ObsDataTableService.newDataTable.subscribe((newObjectData) => {
      localStorage.setItem('data', JSON.stringify(newObjectData));
    });
  }

  connect(): Observable<Array<object>> {
    this.data = JSON.parse(localStorage.getItem('data'));
    localStorage.removeItem('data');
    return of(this.data);
  }

  disconnect() { }

  getDataTable(objectPost: Array<object>) {
    // return this.http.post(objectPost['path'],
    //   {
    //     filters: objectPost['filters'],
    //     sort_order: objectPost['sortOrder'],
    //     page_number: objectPost['pageNumber'],
    //     page_size: objectPost['pageSize'],
    //     sort_direction: objectPost['sortDirection'],
    //     sort_column: objectPost['sortColumn'],
    //     search_value: objectPost['searchValue']
    //   },
    //   { headers: {} })
    //   .toPromise()
    //   .then((res: Response) => {
    //     return {
    //       filters: objectPost['filters'],
    //       sortOrder: objectPost['sort_order'],
    //       pageNumber: objectPost['page_number'],
    //       pageSize: objectPost['page_size'],
    //       sortDirection: objectPost['sort_direction'],
    //       sortColumn: objectPost['sort_column'],
    //       searchValue: objectPost['search_value'],
    //     };
    //   })
    //   .catch((error: Response) => { return error; });

    return [
      { number: 1, series: 1, emission_date: 1, emission_cnpj: 'H' },
      { number: 2, series: 4, emission_date: 4, emission_cnpj: 'He' },
      { number: 3, series: 6, emission_date: 6, emission_cnpj: 'Li' },
      { number: 4, series: 9, emission_date: 9, emission_cnpj: 'Be' },
      { number: 5, series: 10, emission_date: 10, emission_cnpj: 'B' },
    ];
  }

  getColumns(module: string) {
    //   return this.http.post('http://pathConfig/getColumns',
    //     {
    //       module: module
    //     },
    //     { headers: {} })
    //     .toPromise()
    //     .then((res: Response) => {
    //       return res;
    //     })
    //     .catch((error: Response) => { return error; });
    // }

    return [
      { columnDef: 'number', header: 'No.', is_sortable: true },
      { columnDef: 'series', header: 'Série', is_sortable: true },
      { columnDef: 'emission_date', header: 'Data de emissão', is_sortable: true },
      { columnDef: 'emission_cnpj', header: 'CNPJ do emitente', is_sortable: true }
    ];
  }
}
