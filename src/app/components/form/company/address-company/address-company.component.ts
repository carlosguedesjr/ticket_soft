import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address-company',
  templateUrl: './address-company.component.html',
  styleUrls: ['./address-company.component.css']
})
export class AddressCompanyComponent implements OnInit {
  addresses: any;
  constructor() { }

  ngOnInit() {
    this.addresses =[{
      'id': 1,
      'typeAddress': 'Comercial',
      'address': 'Rua das Amoreira',
      'number': '100',
      'neighborhood': 'Centro',
      'state': 'SP',
      'city': 'Campinas',
      'cep': '45366989',
    },{
      'id': 2,
      'typeAddress': 'Entrega',
      'address': 'Av da Independencia',
      'number': '1500',
      'neighborhood': 'Jd dos Eucalipitos',
      'state': 'MS',
      'city': 'Campo Grande',
      'cep': '65244567',
    },{
      'id': 3,
      'typeAddress': 'Faturamento',
      'address': 'Rua Ricardo Martins Benethon',
      'number': '1000',
      'neighborhood': 'Polo Industrial',
      'state': 'SP',
      'city': 'Campinas',
      'cep': '13244556',
    },{
      'id': 4,
      'typeAddress': 'Loja',
      'address': 'Av Brasil',
      'number': '35',
      'neighborhood': 'Centro',
      'state': 'SP',
      'city': 'Cotia',
      'cep': '62243768',
    },{
      'id': 5,
      'typeAddress': 'Loja',
      'address': 'Av. Dos Esportes',
      'number': '476',
      'neighborhood': 'Vila Inocencia',
      'state': 'MG',
      'city': 'Poços de Caldas',
      'cep': '13244777',
    }]
  }

  editAddress(address){
    console.log('edit ',address);
    
  }
  removeAddress(address){
    console.log('remove ',address);
    
  }
}
