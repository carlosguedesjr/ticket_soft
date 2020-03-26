import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})

export class ProfileInformationComponent  implements OnInit {

@Input() imageProfile: string;

  user = {
      office: 'CEO / CO-FOUNDER',
      name: 'maria clementina'
    };

  constructor() { }

  ngOnInit() { }
}
