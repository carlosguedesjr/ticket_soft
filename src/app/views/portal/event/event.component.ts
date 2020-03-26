import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { EventService } from 'src/app/services/Event.service';
import { talkOrganizer } from 'src/app/interfaces/talkOrganizer';
import { ActivatedRoute } from '@angular/router';

import { ConfigService } from 'src/app/services/Config.service';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { MessagingComponent } from 'src/app/components/messaging/messaging.component';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.sass', 'event.component.css']
})

export class EventComponent implements OnInit {

  animal: string;
  event: any;
  icons: any;
  name: string;
  email: string;
  subject: string;
  message: string;
  talk: talkOrganizer;
  url: string;
  telefone: string;
  login: any;
  Swal = (Swal as any);

  constructor(private translate: TranslateService
    , public dialog: MatDialog
    , public eventService: EventService
    , private activatedRoute: ActivatedRoute
    , private configService: ConfigService
    , public dialogRef: MatDialogRef<MessagingComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.url = params['url'];
    });

    this.eventService.getEvent(this.url).then((res) => {
      this.event = res;
      console.log('event: ',this.event);
      
    }).catch((error) => {
      console.log(error);
    });
  }

  talkOganizer(event): void {
    console.log('Fale com organizer: ', event);
    console.log('event.event_id: ', event.event_id);
    
    const dialogRef = this.dialog.open(MessagingComponent, {
      width: '800px',
      data: {
        "typeMessage": 'FO'
        , "event_id": event.event_id
        , "title": 'Fale com o organizador'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  reportEvent(event) {
    console.log('event: ',event);
    
    this.login = this.configService.login();
    if (this.login) {
      const dialogRef = this.dialog.open(MessagingComponent, {
        width: '800px',
        data: {
          "typeMessage": 'DE',
          "event_id": event.event_id,
          "title": "Denunciar Evento"
        }
      });
      // dialogRef.close();
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    else {
      this.Swal.fire({
        title: this.translate.instant('EVENT.ACCESSDENIED'),
        icon: 'info'
      })
    }
  }

  sharedFacebook() {

  }

  sharedTwitter() {
    alert('Twitter');
  }

  sharedEnvelope() {
    alert('email');
  }

  sharedWhatsapp() {
    alert('zapzap');
  }

  sharedPrint() {
    const printContent = document.getElementById('main');
    const WindowPrt = window.open('', '', '');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
}