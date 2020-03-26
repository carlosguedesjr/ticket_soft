import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

    static visibleLodader = new EventEmitter<any>();

    constructor() { }

    hiddenLoader(hidden: boolean) {
        LoaderService.visibleLodader.emit(hidden);
    }
}
