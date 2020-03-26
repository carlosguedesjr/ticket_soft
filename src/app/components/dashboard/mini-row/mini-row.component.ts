import { Component, OnInit, Output, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-mini-row',
  templateUrl: './mini-row.component.html',
  styleUrls: ['./mini-row.component.css']
})
export class MiniRowComponent implements OnInit, OnChanges {

  private oldData = [];
  
  countUpOptions = {
    startVal: 0,
    useEasing: true,
    useGrouping: true,
    separator: '.',
    decimal: ',',
    decimalPlaces: 2,
    prefix: 'R$',
    duration: 2
  };
  
  countUpOptionsText = {
    useEasing: true,
    useGrouping: true,
    separator: '.',
    decimal: ',',
    prefix: 'R$',
    duration: 2,
    decimalPlaces: 2
  };

  @Input() module: string;
  @Input() data = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data) {
      setTimeout(() => {
        this.oldData = [];
        this.data.forEach((item) => {
          this.oldData.push({
            oldText: item.text,
            oldValue: item.value
          });
        });
      }, 200);
    }
  }


}
