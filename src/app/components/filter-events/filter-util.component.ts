import { OnInit } from '@angular/core';
import { ConfigService } from 'src/app/services/Config.service';

export class FilterUtilComponent implements OnInit {
    sessionFilter: any;
    constructor(private configService: ConfigService) { }


    ngOnInit(): void {

    }

    getItemSession() {
        return JSON.parse(window.sessionStorage.getItem(this.configService.sessionFilter));
    }

    setItemSession(filter) {
        window.sessionStorage.setItem(this.configService.sessionFilter, JSON.stringify(filter));
    }

    setValuesfilter(filter) {
    
        this.sessionFilter = this.getItemSession();

        if (this.sessionFilter) {
            if (this.sessionFilter.category.includes(filter))
                this.sessionFilter.category.splice(filter)
            else
                this.sessionFilter.filter.push(filter);
        }
        else {
            this.setItemSession(this.sessionFilter);
        }
    }

    getValuesFilter() {
        return this.sessionFilter = this.getItemSession();
    }



}