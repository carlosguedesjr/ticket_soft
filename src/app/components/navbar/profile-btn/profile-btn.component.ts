import { Component, OnInit, ElementRef, Input, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AuthenticationService } from 'src/app/services/Auth.service';

@Component({
  selector: 'app-profile-btn',
  templateUrl: './profile-btn.component.html',
  styleUrls: ['./profile-btn.component.sass', './profile-btn.component.css'],
  animations: [
    trigger('profilePopupState', [
      state('closed', style({
        display: 'block',
        transform: 'scale(1, 0)'
      })),
      state('expanded', style({
        display: 'block',
        transform: 'scale(1, 1) translateY(10px)'
      })),
      transition('closed => expanded', animate(100)),
      transition('expanded => closed', animate(100))
    ])
  ]
})
export class ProfileBtnComponent implements OnInit {
  state: string = 'closed';
  arrowDownStatus: boolean = false;
  @Input() loggedUser;

  constructor(private elRef: ElementRef, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.loggedUser = user;
    });
  }

  toggleLoginPanel(event: Event) {
    if ((event.target['className'].includes('profile-link') || 
         event.target['className'].includes('dashboard-link') ||
         event.target['className'].includes('clickable-icon') ||
         event.target['className'].includes('icon-clickable')) && 
         this.state == 'expanded') {
      this.state = 'closed';
      this.arrowDownStatus = false;
    } else if (this.elRef.nativeElement.contains(event.target)) {
        this.arrowDownStatus = true;
        this.state = 'expanded';
    } else {
      this.state = 'closed';
      this.arrowDownStatus = false;
    }
  }

}
