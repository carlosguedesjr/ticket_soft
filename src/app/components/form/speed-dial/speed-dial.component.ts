import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-speed-dial',
  templateUrl: './speed-dial.component.html',
  styleUrls: ['./speed-dial.component.css']
})
export class SpeedDialComponent implements OnInit {

  @Input() moduleList = [];
  @Output() handleChangeModule = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  changeModule(moduleName) {
    this.handleChangeModule.emit(moduleName);
  }

}
