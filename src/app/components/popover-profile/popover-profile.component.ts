import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/Auth.service';
import { Subject } from 'rxjs';
import { EventsService } from 'src/app/services/Events.service';
import { JwtService } from 'src/app/services/Jwt.service';

@Component({
  selector: 'app-popover-profile',
  templateUrl: './popover-profile.component.html',
  styleUrls: ['./popover-profile.component.sass', './popover-profile.components.css']
})
export class PopoverProfileComponent implements OnInit {

  constructor(private authService: AuthenticationService
    , private jwtService: JwtService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
   // this.jwtService.logout();
  }

}
