import { Component, OnInit } from '@angular/core';
import { DataTableService } from '../../../services/DataTable.service';
import { ObsDataTableService } from './../../../services/ObsDataTable.service';
import { NavbarService } from '../../../services/Navbar.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  private data: any;
  private columns: any;
  private displayedColumns: any;
  private dataSource: any;

  constructor(
    private dataTableService: DataTableService,
    private obsdataTable: ObsDataTableService
  ) {
    ObsDataTableService.parametersDatatable.subscribe((a) => {
      this.data = a.data;
      this.columns = a.columns;
    });
  }

  ngOnInit() {
    this.obsdataTable.changeData(this.data);
    this.displayedColumns = this.columns.map(c => c.columnDef);
    this.dataSource = new DataTableService();
  }
}
