import { DocumentsMiniService } from './../../../services/dashboard/DocumentsMini.service';
import { Component, OnInit } from '@angular/core';
import { MapRowService } from '../../../services/dashboard/MapRow.service';

@Component({
  selector: 'app-documents-mini-row',
  templateUrl: './documents-mini-row.component.html',
  styleUrls: ['./documents-mini-row.component.css']
})
export class DocumentsMiniRowComponent implements OnInit {

  private countryData: Array<string>;
  private selectedModule: string;
  private documentsList: Array<string>;
  private moduleData: Array<any>;
  private icons = {
    sent: {
      icon: 'navigation',
      iconClass: 'green-toolbar'
    },
    received: {
      icon: 'get_app',
      iconClass: 'blue-toolbar'
    },
    canceled: {
      icon: 'backspace',
      iconClass: 'pink-toolbar'
    },
    event: {
      icon: 'event_note',
      iconClass: 'purple-toolbar'
    },
  };

  constructor(
    private dataSource: DocumentsMiniService,
    private mapDataSource: MapRowService,
  ) { }

  ngOnInit() {
    this.dataSource.getSelectedModule().then(
      (res) => {
        this.selectedModule = res['module'];
        this.getModuleData(this.selectedModule);
      },
      () => { }
    );
    this.dataSource.getModulesList().then(
      (res) => {
        this.documentsList = res['documents'];
      },
      () => { }
    );
  }

  changeModule(module) {
    this.selectedModule = module;
    this.getModuleData(module);
  }

  getModuleData(module) {
    this.dataSource.getModuleData(this.selectedModule).then(
      (data) => {
        this.moduleData = Object.keys(data).map((property) => {
          const item = data[property];
          return {
            type: property,
            text: item.quantity,
            value: item.value,
            lastDate: item.lastDate,
            ...this.icons[property],
          };
        });
      },
      () => { }
    );

    this.mapDataSource.getMapData(this.selectedModule).then(
      (res: any) => {
        this.countryData = res;
      },
      () => { }
    );
  }

}
