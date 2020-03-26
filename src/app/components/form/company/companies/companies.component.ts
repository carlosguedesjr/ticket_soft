import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/Company.service';

export interface Companies {
  id: number,
  name: string;
  document: string;
  state: string;
  city: string;
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  //companies : any;
  displayedColumns: string[] = ['Empresa', 'Cnpj', 'Uf', 'Cidade', 'Acoes'];
  dataSource: any;
  constructor(private router: Router
    , private activatedRoute: ActivatedRoute
    , private companyService: CompanyService) { }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    const companies: Companies[] = [
      {
        'id': 1,
        'name': 'Softvision Soluções em tecnologia',
        'document': '12.432.212/0001-09',
        'state': 'SP',
        'city': 'Campinas'
      }, {
        'id': 2,
        'name': 'New Project Teams LTDA',
        'document': '09.756.42/0001-00',
        'state': 'SP',
        'city': 'Campinas'
      }, {
        'id': 3,
        'name': 'Guedes tecnologia ME',
        'document': '07.558.805/0001-76',
        'state': 'SP',
        'city': 'Mogi das Cruzes'
      }, {
        'id': 4,
        'name': 'Minas Tabuleiros LTDA',
        'document': '45.887.997/0001-24',
        'state': 'MG',
        'city': 'Liberdade'
      }, {
        'id': 5,
        'name': 'Limeirenses SA',
        'document': '07.544.325/0001-74',
        'state': 'SP',
        'city': 'Mogi das Cruzes'
      }]


    this.dataSource = new MatTableDataSource(companies);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editCompany(element) {
    this.companyService.sendIdCompany(element.id);
    this.router.navigate(['../detalhe',element.id], { relativeTo: this.activatedRoute });
  }

  user(element) {
    console.log('user ', element.id)
  }

  address(element) {
    this.router.navigate(['../enderecos',element.id], { relativeTo: this.activatedRoute });
  }

  information(element) {
    console.log('information ', element.id)
  }
}
