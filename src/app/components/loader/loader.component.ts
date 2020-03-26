import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/Loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  private loaderClass: string;

  constructor() {
    LoaderService.visibleLodader.subscribe((hiddenLoading: boolean) => {
      this.loaderClass = hiddenLoading ? 'animated finite fadeIn visible' : 'animated finite fadeOut';
      // this.isLoading = hiddenLoading;
    });
  }

  ngOnInit() {
  }

}
