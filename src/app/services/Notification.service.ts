import { Injectable } from '@angular/core';
import { ToastrService, ToastrConfig, ToastrModule } from 'ngx-toastr';

@Injectable()
export class NotificationService {

  private options: ToastrConfig;

  constructor(private toastrService: ToastrService) {
    this.options = this.toastrService.toastrConfig;
    this.options.positionClass = 'toast-bottom-right';
    this.options.closeButton = false;
    this.options.timeOut = 2500;
    this.options.progressBar = true;
    this.toastrService.toastrConfig.maxOpened = 3;
  }

  /**
   *  PopUp notiofication success
   *
   *
   * @memberOf NotificationService
   */
  public success = (body: any, title: any = ''): void => {
    this.toastrService.success(body, title, this.options);
  }

  /**
   *  PopUp notiofication error
   *
   *
   * @memberOf NotificationService
   */
  public error = (body: any, title: any = ''): void => {
    this.toastrService.error(body, title, this.options);
  }

  /**
   *  PopUp notiofication warning
   *
   *
   * @memberOf NotificationService
   */
  public warning = (body: any, title: any = ''): void => {
    this.toastrService.warning(body, title, this.options);
  }
}
