import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/Contact.service';
import { FormBuilder, FormGroup, EmailValidator, Validators } from '@angular/forms';
import { MessagingService } from 'src/app/services/Messaging.service';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass', './contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  Swal = (Swal as any);

  constructor(private fb: FormBuilder,
    private messagingService: MessagingService) { }

  ngOnInit() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required
        , Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  sendContact() {
    console.log(this.contactForm.value);
    this.messagingService.postMessage(this.contactForm.value, 'CE')
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
