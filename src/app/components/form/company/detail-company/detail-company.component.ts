import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/Company.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressService } from 'src/app/services/Address.service';
import { truncateWithEllipsis } from '@amcharts/amcharts4/.internal/core/utils/Utils';

@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.css']
})
export class DetailCompanyComponent implements OnInit {
  idCadastro: any;
  companyForm: FormGroup;
  typesCompany: any;

  constructor(private companyService: CompanyService
    , private addressService: AddressService
    , private route: ActivatedRoute
    , private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.idCadastro = params['id'];
      })

    this.typesCompany = [{
      'id': 1,
      'description': 'Pequeno'
    }, {
      'id': 2,
      'description': 'Médio'
    }, {
      'id': 3,
      'description': 'Grande'
    }];


    this.companyForm = this.fb.group({
      type: [''],
      company_name: ['', Validators.required],
      fantasy_name: [''],
      municipal_registration: ['', Validators.required],
      state_registration: ['', Validators.required],
      cep_registration: ['', Validators.required],
      document: ['', Validators.required]
    });

    // this.companyService.subIdCompany.subscribe((idCompany) => {
    //   console.log('IdEmpresa: ', idCompany);
    //   this.idCadastro = idCompany;
    // })

  }

  getCep(event) {
    this.addressService.getAddressFromCep(event.target.value).then(res => {
      this.companyForm.patchValue({
        municipal_registration: res['localidade'],
        state_registration: res['uf']
      })

    }).catch(error => {
      console.log('erro ao buscar cep: ', error);

    })
  }
  getProfileReceita(event) {
    this.companyService.getProfileReceita(event.target.value).then(res => {
      console.log('retorno receita: ', res);
    }).catch(error => {
      console.log('erro receita: ', error);
    })
  }

  saveForm() {

  }

}
