import { Component, OnInit, Inject } from '@angular/core';
import { Contacts } from '../../../interfaces/contacts';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/Contact.service';
import { ConfigService } from 'src/app/services/Config.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  typeContacts: any;
  typeContactsOrder: any;
  login: any;
  userContact: any;
  contacts: Contacts[] = [];
  contactForm: FormGroup;
  Swal = (Swal as any);

  constructor(private fb: FormBuilder
    , private contactService: ContactService
    , private configService: ConfigService
    , public dialogRef: MatDialogRef<ContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.contactForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]]
    });

    this.contactForm.patchValue({
      type: this.data.userContact['type'],
      name: this.data.userContact['name'],
      phone: this.data.userContact['phone'],
      email: this.data.userContact['email']
    });
  }

  onNoClick(event): void {
    this.Swal.fire(
      'Contato salvo com sucesso!',
      '',
      'success'
    )
    this.dialogRef.close();
  }

  changeAddressType(address) {
    this.login = this.configService.login();
  }

  saveForm() {
    this.contactService.save(this.contactForm.value)
      .subscribe(data => {
        this.Swal.fire(
          'Contato salvo com sucesso!',
          data,
          'success'
        )
        this.dialogRef.close();
      }),
      err => {
        //Ajustar...não chega aqui..
        this.Swal.fire(
          'Erro ao salvar contato!',
          err,
          'error'
        )
      }
  }

}
