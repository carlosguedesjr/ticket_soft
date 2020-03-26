import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() title?: string;
  @Input() classTitle?: string;
  @Input() type: string;
  @Input() icon?: string;
  @Input() color: string;
  @Input() class: string;
  @Input() tooltip?: string;
  @Input() tooltipPosition?: string;
  @Input() text?: string;
  @Input() classText?: string;

  constructor() { }

  ngOnInit() {}

}
