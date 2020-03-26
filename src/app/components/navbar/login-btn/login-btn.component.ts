import { Component, OnInit, ElementRef } from '@angular/core';
import { trigger, style, state, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.sass', 'login-btn.component.css'],
  animations: [
    trigger('loginPopupState', [
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
export class LoginBtnComponent implements OnInit {
  state: string = 'closed';

  constructor(private elRef : ElementRef) { }

  ngOnInit() {
  }

  toggleLoginPanel(event: Event) {
    if ((event.target['className'] == 'loginLink' ||
         event.target['className'].includes('clickable-icon') ||
         event.target['className'].includes('signup_btn')) &&
         this.state == 'expanded') {
      this.state = 'closed';
    } else if (this.elRef.nativeElement.contains(event.target)) {
        this.state = 'expanded';
    } else {
      this.state = 'closed';
    }
  }
}
