import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { slideShoppingCartService } from 'src/app/services/slideShoppingCart.service';
import { ShoppingCartService } from 'src/app/services/ShoppingCart.service';
import { EventsService } from 'src/app/services/Events.service';
import { ConfigService } from 'src/app/services/Config.service';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.sass', './shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cartItens: any = [];
  slideState: string;
  matErroStatus: boolean;
  sessionStorageShoppingCart: any;
  Swal = (Swal as any);

  @ViewChild('slideShoppingCart', { static: false }) slideShoppingCart: ElementRef;
  @ViewChild('backgroundClose', { static: false }) backgroundClose: ElementRef;
  @ViewChild('shoppingCartPanel', { static: false }) shoppingCartPanel: ElementRef;


  constructor(private slide: slideShoppingCartService
    , private shoppingCartService: ShoppingCartService
    , private eventService: EventsService
    , private configService: ConfigService) { }

  ngOnInit() {
    //recuperar carrinho de compras da sessionStorge
    // this.sessionStorageShoppingCart = window.sessionStorage.getItem(this.configService.sessionNameStorageShoppingCart());

    //if (!this.sessionStorageShoppingCart) {
    this.eventService.subScription.subscribe((item: any) => {
      let founditem = this.cartItens.find((i) => i.id === item.id);
      if (founditem) {
        this.addItem(item);
      }
      else {
        this.cartItens.push(item)
        this.shoppingCartService.addQtdEventsBadge('SUM');
      }
    })
    //}
    // else {
    //   this.cartItens = JSON.parse(this.sessionStorageShoppingCart);
    // }


    slideShoppingCartService.slideStateShoppingCart.subscribe((eventType) => {
      this.slideState = eventType;
      this.shoppingCartService.sendShoppingCartElementPanel(this.shoppingCartPanel);

      if (eventType === 'active') {
        this.slideShoppingCart.nativeElement.classList.remove('close-cart');
        this.slideShoppingCart.nativeElement.classList.add('open-cart');
        this.backgroundClose.nativeElement.classList.add('visible');
      } else {
        this.slideShoppingCart.nativeElement.classList.remove('open-cart');
        this.slideShoppingCart.nativeElement.classList.add('close-cart');
        this.backgroundClose.nativeElement.classList.remove('visible');
      }
    });
  }

  invites(): any[] {
    return this.shoppingCartService.invites;
  }

  clearEvent(item: any) {
    this.shoppingCartService.clear(item);
    this.cartItens.map((el, i) => {
      if (el.id === item.id) {
        this.cartItens.splice(i, 1);
      }
    });
    this.shoppingCartService.addQtdEventsBadge('LASS');
  }

  removeItem(item: any, qtdItens: any) {
    console.log('thumb: ', item.thumb);
    console.log('item: ', item);
    console.log('qtdItens: ', qtdItens);
  
    
    if (qtdItens == 1) {
      this.Swal.fire({
        title: 'Não podemos ter um evento sem ingresso',
        text: "Deseja remover esse item do carrinho",
        // icon: 'warning',
        imageUrl: item.thumb,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, remover!'
      }).then((result) => {
        if (result.value) {
          debugger;
          
          this.Swal.fire(
            'Excluido!',
            'Evento removido do carrinho.',
            'success'
          )
        }
      })
    } else {
      this.shoppingCartService.removeItem(item);
    }






  }

  addItem(item: any) {
    this.shoppingCartService.addItem(item);
  }


  finalizarPedido(cartItens) {
    this.shoppingCartService.sendCartItems(cartItens);

    window.sessionStorage.setItem(this.configService.sessionNameStorageShoppingCart(), JSON.stringify(cartItens));

    this.closeSlideCart();
  }

  closeSlideCart() {
    if (this.slideState !== 'active') {
      this.slideShoppingCart.nativeElement.classList.remove('close-cart');
      this.slideShoppingCart.nativeElement.classList.add('open-cart');
      this.backgroundClose.nativeElement.classList.add('visible');
    } else {

      this.slideShoppingCart.nativeElement.classList.remove('open-cart');
      this.slideShoppingCart.nativeElement.classList.add('close-cart');
      this.backgroundClose.nativeElement.classList.remove('visible');
    }
    this.slide.closeShoppingCart('close');
  }

  errorHandler(err: any): void {
    console.log(err);
  };

  ngOnDestroy() {
    this.eventService.subScription.unsubscribe();
  }
}
