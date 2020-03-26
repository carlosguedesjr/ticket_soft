import { LoaderService } from './../../../services/Loader.service';
import { Component, OnInit, ViewChild, Output, EventEmitter, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator, PageEvent, MatSort } from '@angular/material';

import { tap } from 'rxjs/internal/operators';
import { DataTableService } from '../../../services/DataTable.service';
import { ObsDataTableService } from './../../../services/ObsDataTable.service';
import { NavbarService } from '../../../services/Navbar.service';

@Component({
  selector: 'app-data-table-actions',
  templateUrl: './data-table-actions.component.html',
  styleUrls: ['./data-table-actions.component.css']
})
export class DataTableActionsComponent implements OnInit, AfterViewInit, OnChanges {

  private data: any;
  private columns: any;
  private displayedColumns: any;
  private dataLength: number;
  private defaultPageSize = 50;
  private filterTimeout;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  @Input() path: string;
  @Input() filters: Array<object>;
  @Input() actions: Array<any>;

  constructor(
    private dataSource: DataTableService,
    private obsdataTable: ObsDataTableService,
    private loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    // this.dataSource.getDataTable([{
    //   path: this.path,
    //   filters: this.filters,
    //   sortOrder: '',
    //   page_number: '0',
    //   page_size: this.defaultPageSize
    // }]).then((res) => {
    //   this.data = this.dataStruct(res['data']);
    //   this.obsdataTable.changeData(this.data);
    //   this.dataSource = new DataTableService();
    // }).catch((error) => {
    //   console.log(error);
    // });
    // this.loaderService.hiddenLoader(true);
    const res = this.dataSource.getDataTable([{
      path: this.path,
      filters: '',
      sortDirection: '',
      sortColumn: '',
      pageNumber: '0',
      pageSize: this.defaultPageSize,
      searchValue: '',
    }]);
    this.dataLength = res.length;
    this.data = this.dataStruct(res);
    this.obsdataTable.changeData(this.data);
    this.dataSource = new DataTableService();
    // this.loaderService.hiddenLoader(false);



    // this.dataSource.getColumns('').then((res) => {
    //   this.columns = this.columnsStruct(res['data']);
    //   this.displayedColumns = this.columns.map(c => c.columnDef); // !important
    // }).catch((error) => {
    //   console.log(error);
    // });
    const resColumn = this.dataSource.getColumns('');
    this.columns = this.columnsStruct(resColumn);
    this.displayedColumns = this.columns.map(c => c.columnDef);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadDataPage())).subscribe();
  }

  dataStruct(response) {
    response.forEach((item) => {
      item.actions = this.actions;
    });
    return response;
  }

  columnsStruct(response) {
    response.forEach(item => {
      item.cell = (element) => `${element[item.columnDef]}`;
    });
    response.push({
      columnDef: 'actions',
      header: 'actions',
      cell: (element: any) => element.actions,
      is_sortable: false
    });

    return response;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.filters.currentValue) {
      this.loadDataPage();
    }
  }

  loadDataPage(searchValue?: string) {
    // this.loaderService.hiddenLoader(true);
    const res = this.dataSource.getDataTable([{
      path: this.path,
      filters: this.filters,
      sortDirection: this.sort.direction,
      sortColumn: this.sort.active,
      pageNumber: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchValue: searchValue
    }]);
    this.dataLength = res.length;
    this.data = this.dataStruct(res);
    this.obsdataTable.changeData(res);
    this.dataSource = new DataTableService();
    // setTimeout(() => {
    //   this.loaderService.hiddenLoader(false);
    // }, 1000);

    // this.loaderService.hiddenLoader(true);
    // this.dataSource.getDataTable([{
    //   path: this.path,
    //   filters: this.filters,
    //   sortDirection: this.sort.direction,
    //   sortColumn: this.sort.active,
    //   pageNumber: this.paginator.pageIndex,
    //   pageSize: this.paginator.pageSize,
    //   searchValue: searchValue
    // }]).then((res) => {
    //   this.loaderService.hiddenLoader(false);
    //   this.data = this.dataStruct(res['data']);
    //   this.obsdataTable.changeData(this.data);
    //   this.dataSource = new DataTableService();
    // }).catch((error) => {
    //   this.loaderService.hiddenLoader(false);
    //   console.log(error);
    // });
  }

  applyFilter(searchValue: string) {
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.loadDataPage(searchValue);
    }, 1000);
  }

  eventType(eventType: string) {
    this.obsdataTable.getEventTable(eventType);
  }

}
