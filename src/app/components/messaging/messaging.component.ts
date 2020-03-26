import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MessagingService } from 'src/app/services/Messaging.service';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.css']
})
export class MessagingComponent implements OnInit {
  Swal = (Swal as any);
  messageForm: FormGroup;
  constructor(private fb: FormBuilder
    , public messagingService: MessagingService
    , public dialogRef: MatDialogRef<MessagingComponent>
    , @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.messageForm = this.fb.group({
      idEvento: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required
        , Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
    this.messageForm.patchValue({
      event_id: this.data['event_id']
    })
  }

  sendMessage() {
    this.messagingService.postMessage(this.messageForm.value, this.data['typeMessage'])
      .subscribe(data => {
        this.Swal.fire(
          'Mensagem enviada com sucesso!',
          data,
          'success'
        )
        // this.dialogRef.close();
      }),
      err => {
        //Ajustar...não chega aqui..
        this.Swal.fire(
          'Erro ao enviar mensagem!',
          err,
          'error'
        )
      }
  }
}
