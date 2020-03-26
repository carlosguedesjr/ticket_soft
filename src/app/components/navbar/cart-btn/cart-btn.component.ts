import { Component, OnInit, ElementRef, OnDestroy, Input } from '@angular/core';
import { slideShoppingCartService } from 'src/app/services/slideShoppingCart.service';
import { ShoppingCartService } from 'src/app/services/ShoppingCart.service';
import { eventTarget } from '@amcharts/amcharts4/.internal/core/utils/DOM';

@Component({
  selector: 'app-cart-btn',
  templateUrl: './cart-btn.component.html',
  styleUrls: ['./cart-btn.component.sass', './cart-btn.component.css']
})
export class CartBtnComponent implements OnInit, OnDestroy {

  shoppingCartElement;

  @Input() qtdEventsShoppingCardBadge: number;

  private slideShoppingCartState: string = 'close';
  constructor(private slide: slideShoppingCartService,
              private elRef: ElementRef,
              private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    slideShoppingCartService.closeShoppingCart.subscribe((eventType) => {
      this.slideShoppingCartState = eventType;
    });

    this.shoppingCartService.shoppingCartElementSubject.subscribe(data => {
      this.shoppingCartElement = data;
    })
  }

  changeStateSlideShoppingCart(event: any) {

    let clickStatus = this.checkWhereIsClicked();

    if (clickStatus) {
      return;
    }
    else if (this.elRef.nativeElement.contains(event.target)) {
      this.slideShoppingCartState = 'active';
      this.slide.changeState(this.slideShoppingCartState)
    }
    else {
      this.slideShoppingCartState = 'close';
      this.slide.changeState(this.slideShoppingCartState)
    }
  }

  checkWhereIsClicked() {
    if (this.shoppingCartElement && (event.target['className'].includes('shopping-cart') 
        || event.target['className'].includes('shopping-cart-item-remove')
        || event.target['className'].includes('shopping-cart-quantity')
        || event.target['className'].includes('text-center')
        || event.target['className'].includes('input-quantity')
        || event.target['className'].includes('event-location')
        || event.target['className'].includes('icon-clock')
        || event.target['className'].includes('event-date')
        || event.target['className'].includes('text-quantity')
        || event.target['className'] == "")
        || (event.target['className'].includes("mat-icon") && !event.target['className'].includes("cart-btn"))) {
      return true;
    }
    return false; 
  }

  ngOnDestroy() {
    this.shoppingCartService.shoppingCartElementSubject.unsubscribe();
  }

}
