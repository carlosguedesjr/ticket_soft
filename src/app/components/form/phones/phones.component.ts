import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileUserService } from 'src/app/services/ProfileUser.service';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.sass', './phones.component.css']
})
export class PhonesComponent implements OnInit {
  phoneTypes: any;
  phoneForm: FormGroup;
  Swal = (Swal as any);

  constructor(private fb: FormBuilder
    , private profileUserService: ProfileUserService
    , public dialogRef: MatDialogRef<PhonesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.profileUserService.getPhoneTypes().subscribe(data => {
      this.phoneTypes = data
    })

    this.phoneForm = this.fb.group({
      type: [''],
      phone: [''],
      idTelefone:['']
    });

    this.phoneForm.patchValue({
      type: this.data.phone.idTipoTelefone,
      phone: this.data.phone.numero,
      idTelefone: this.data.phone.idTelefone
    });
  }

  ngOnChange() {
  }

  saveForm() {
    if (this.data.phone) {
      this.profileUserService.updatePhone(this.phoneForm.value)
        .subscribe(data => {
          this.Swal.fire(
            'Telefone altualizado com sucesso!',
            data,
            'success'
          )
          this.profileUserService.getUserInformation();
          this.dialogRef.close();
        })
    }
    else{
      this.profileUserService.postPhone(this.phoneForm.value)
      .subscribe(data => {
        this.Swal.fire(
          'Telefone salvo com sucesso!',
          data,
          'success'
        )
        this.profileUserService.getUserInformation();
        this.dialogRef.close();
      })
    }
  }
}
