import { Component, OnInit, LOCALE_ID, Inject, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressService } from 'src/app/services/Address.service';
import { ConfigService } from 'src/app/services/Config.service';
import { TranslateService } from '@ngx-translate/core';
import * as Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { CheckoutService } from 'src/app/services/Checkout.service';

@Component({
  selector: 'app-checkout-step-one',
  templateUrl: './checkout-step-one.component.html',
  styleUrls: ['./checkout-step-one.component.sass', './checkout-step-one.component.css']
})
export class CheckoutStepOneComponent implements OnInit {

  price: [];
  address: any;
  params: any[];
  eventAttributes: any[];
  value = null;

  term = "TICKET AGORA é plataforma de vendas dos ingressos / inscrições on-line. Não temos responsabilidade e poder sobre organização e ocorrências relativas a este evento.<br><br>Declaro que:<br><br>1. Estarei presente neste evento por minha livre e espontânea vontade, isentando de quaisquer responsabilidades os ORGANIZADORES e as empresas envolvidas, em meu nome e de meus herdeiros; <br><br>2. Isento organizadores e empresas envolvidas no evento de qualquer responsabilidade sobre objetos deixados por mim em guarda-volumes, chapelaria ou locais indicados pela organização do evento;<br><br>3. Estou ciente que o valor pago não será devolvido em caso de cancelamento ou não participação no evento, bem como não são aceitas substituições / troca de participantes;<br><br>4. Estou de acordo com cobrança de valor adicional da TAXA DE SERVIÇO para cada novo ingresso / inscrito adquirido no sistema, caso haja a respectiva taxa;<br><br>5. Estou ciente que ingressos / inscrições podem encerrar-se a qualquer momento, sob definição da empresa organizadora;<br><br>6. Confirmo que, para garantir meu ingresso / inscrição é necessário efetuar o pagamento do valor total do mesmo, e que, caso não seja pago ou pago em valor divergente, o ingresso será cancelado automaticamente no sistema e a vaga liberada;<br><br>7. É de minha responsabilidade obter todas as informações sobre o evento, tais como: data, local e horário;<br><br>8. Estou fisicamente e mentalmente apto a participar deste evento, nas condições propostas pela organização;<br><br> 9. Autorizo a utilização por parte do organizador, patrocinadores e TICKET AGORA de qualquer dado, fotografia, filme ou outra gravação contendo imagens de minha participação neste evento, em qualquer mídia seja impressa ou eletrônica, incluindo na Internet, para qualquer fim e por tempo indeterminado;<br><br>10. Autorizo recebimento de e-mails, SMS e WhatsApp, bem como qualquer meio digital de comunicação, do ORGANIZADOR e TICKET AGORA e seus parceiros divulgando informações, notícias e serviços;<br><br>11. Na realização do cadastro, compra de ingressos ou inscrições para terceiros, tenho a autorização deste(s) participante(s), me responsabilizo pela legitimidade de dados fornecidos e garanto que o mesmo tem total ciência desta declaração e do respectivo REGULAMENTO do evento;<br><br>12. Estou totalmente ciente e concordo com o REGULAMENTO ou REGRAS GERAIS deste Evento;";

  @Output() statusStepOne = new EventEmitter<string>();
  @Output() stepOneEmitter = new EventEmitter();

  firstFormGroup: FormGroup;

  private shipping = [
    {
      type: 'sedex',
      thumb: 'https://e3ba6e8732e83984.cdn.gocache.net/uploads/image/file/404912/regular_correios-logo-2.png',
      value: '25,00',
    },
    {
      type: 'pac',
      thumb: 'https://e3ba6e8732e83984.cdn.gocache.net/uploads/image/file/404912/regular_correios-logo-2.png',
      value: '25,00',
    },
    {
      type: 'jadlog',
      thumb: 'data:image/jpeg;base64,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',
      value: '45,00',
    }
  ];

  panelOpenState = false;
  labelPosition = '1';

  cartTotal = '9.999,00';
  items: any;
  events: any;
  dynamicFormGroup: FormGroup;

  sessionStorageShoppingCart;
  Swal = (Swal as any);

  constructor(
    private addressService: AddressService,
    private configService: ConfigService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private checkoutService: CheckoutService) { }

  ngOnInit() {

    this.sessionStorageShoppingCart = window.sessionStorage.getItem(this.configService.sessionNameStorageShoppingCart());
    this.events = JSON.parse(this.sessionStorageShoppingCart);

    this.firstFormGroup = new FormGroup({
      cep: new FormControl('', [Validators.required]),
      checkbox: new FormControl('', [Validators.required])
    });

    this.dynamicFormGroup = this.formBuilder.group({
      myEvents: this.makeEvent(this.events)
    });

    // VERIFICAÇÃO DO STATUS DO STEPPER, SE VÁLIDO PERMITE PASSAR PARA O PRÓXIMO
    this.firstFormGroup.statusChanges.subscribe(data => {
      if (data === 'VALID') {
        this.statusStepOne.emit('true');
      } else {
        this.statusStepOne.emit('false');
      }
    });

  }

  structItensFormArray(obj) {
    const formArray = this.formBuilder.array([]);
    const tempObj = {};
    const sTempObj = {};

    Object.keys(obj).map((objIndex) => {
      if (Array.isArray(obj[objIndex])) {
        obj[objIndex].map((item, indexItem) => {
          sTempObj[objIndex] = item;
          formArray.push(this.formBuilder.group(sTempObj));
        });

        tempObj[objIndex] = formArray;
      } else {
        tempObj[objIndex] = obj[objIndex];
      }
    });

    return tempObj;
  }

  structFormArray(listObj) {
    const formArray = this.formBuilder.array([]);

    listObj.map((obj) => {
      formArray.push(this.formBuilder.group(this.structItensFormArray(obj)));
    });

    return formArray;
  }

  makeSubObject(product) {
    let temp = {};
    const tempObj = {};
    const formArray = this.formBuilder.array([]);

    Object.keys(product).map((indexProduct) => {
      if (Array.isArray(product[indexProduct])) {
        product[indexProduct].map((attributes) => {
          Object.keys(attributes).map((indexAttributes) => {
            temp[indexAttributes] = this.structFormArray(attributes[indexAttributes]);
            formArray.push(this.formBuilder.group(temp));
            temp = {};
          });
        });
        tempObj[indexProduct] = formArray;
      } else {
        tempObj[indexProduct] = product[indexProduct];
      }
    });

    return this.formBuilder.group(tempObj);
  }

  makeFormProducts(invitProducts) {
    const formArray = this.formBuilder.array([]);

    if (invitProducts && invitProducts.length > 0) {
      invitProducts.map((e) => {
        formArray.push(this.formBuilder.group(e));
      });
    }

    return formArray;
  }

  makeObject(invit, attributes?) {
    const object = {};

    attributes.map((at) => {
      const nameAttribute = at.attribute;
      object[at.attribute] = invit[nameAttribute];
    });

    object['price'] = invit['price'];
    object['type_invite_selected'] = invit.type_invite_selected;
    object['products'] = this.makeFormProducts(invit['products']);
    object['optional_products'] = this.makeFormProducts(invit['optional_products']);
    return object;
  }

  makeFormArray(properties, eventAttributes?) {
    const formArray = this.formBuilder.array([]);

    if (!properties) {
      return formArray;
    }

    if (eventAttributes) {
      properties.map((el, i) => {
        formArray.push(this.formBuilder.group(this.makeObject(el, eventAttributes)));
      });
    } else {
      properties.map((el, i) => {
        if (!el.hasOwnProperty('attributes')) {
          formArray.push(this.formBuilder.group(el));
        } else {
          formArray.push(this.makeSubObject(el));
        }
      });
    }

    return formArray;
  }

  makeEvent(event) {
    const formArray = this.formBuilder.array([]);
    event.map((el) => {
      formArray.push(
        this.formBuilder.group({
          id: el.id,
          thumb: el.thumb,
          event: el.event,
          price: el.price,
          location: el.location,
          date: el.date,
          max_invite: el.max_invite,
          text: el.text,
          subtitle: el.subtitle,
          featured_events: el.featured_events,
          category: el.category,
          sold_off: el.sold_off,
          config_products: this.makeFormArray(el.config_products),
          invites: this.makeFormArray(el.invites, el.attributes),
          products: this.makeFormArray(el.products),
          product_categories: this.makeFormArray(el.product_categories),
          optional_products: this.makeFormArray(el.optional_products),
          invite_type: this.makeFormArray(el.invite_type),
          attributes: this.makeFormArray(el.attributes)
        })
      );
    });

    return formArray;
  }

  submitForm(firstFormGroup: FormGroup) {
    if (firstFormGroup.status === 'VALID') {
      this.stepOneEmitter.emit();
    }

  }

  getCEPData(event) {
    let valueCep = event.target.value;

    valueCep = valueCep.replace('.', '').replace('-', '');

    this.addressService.getAddressFromCep(valueCep).then((res) => {
      this.address = res;
    }).catch((error) => {
      console.log(error);
    });
  }

  getValueSelected(value: any) {
    this.events.map((el) => {
      if (el.id === value.event_id) {
        el.invites.map((e, i) => {
          if (i === value.invit) {
            el.invites[i].price = value.price;
            el.invites[i].type_invite_selected = value;
          }
        });
      }
    });

    this.dynamicFormGroup.controls.myEvents['controls'][value.event_index].controls.invites.controls[value.invit].controls.price.value = value.price_type_invit;
    this.dynamicFormGroup.controls.myEvents['controls'][value.event_index].controls.invites.controls[value.invit].controls.type_invite_selected.value = value;

    window.sessionStorage.setItem(this.configService.sessionNameStorageShoppingCart(), JSON.stringify(this.events));
  }

  changeValueSessionObj(currentEvent, action, eventPrice, invitationPrice, attribute) {
    let indexRemove: number;

    this.events.map((event) => {
      event.price = eventPrice;
      if (event.id === currentEvent.event_id) {
        event.invites.map((invit, invitIndex) => {
          if (invitIndex === currentEvent.invit) {
            if (action === 'add') {
              if (!event.invites[invitIndex][attribute]) {
                event.invites[invitIndex][attribute] = [currentEvent.value];
              } else {
                event.invites[invitIndex][attribute].push(currentEvent.value);
              }
              event.invites[invitIndex]['price'] = invitationPrice;
            } else {
              event.invites[invitIndex]['price'] = invitationPrice;
              event.invites[invitIndex][attribute].map((prod, indexProd) => {
                if (prod.id === currentEvent.value.id) {
                  event.invites[invitIndex][attribute].splice(indexProd, 1);
                  indexRemove = indexProd;
                }
              });
            }
          }
        });
      }
    });

    window.sessionStorage.setItem(this.configService.sessionNameStorageShoppingCart(), JSON.stringify(this.events));
    return indexRemove;
  }

  getEventAttributes(event) {
    this.dynamicFormGroup.controls.myEvents['controls'][event.event_index].controls.invites.controls[event.invit].controls[event.attribute].value = event.value;
    // this.changeValueSessionObj(event, event.attribute);
  }

  getValueProductAttribute(value) {
    // console.log(value);
    // console.log(this.dynamicFormGroup.controls.myEvents['controls'][value.event_index].controls.invites.controls[value.invit].controls);
  }

  addProductPriceTotalInvitationPrice(obj) {
    let priceInvit = this.dynamicFormGroup.controls.myEvents['controls'][obj.event_index].controls.invites.controls[obj.invit].controls.price;
    const currentPrice = parseFloat(priceInvit.value);
    const priceProduct = obj.product.discount_amount ? (parseFloat(obj.product.price) - parseFloat(obj.product.discount_amount)) : parseFloat(obj.product.price);
    const newPriceInvit = (parseFloat(priceInvit.value) + priceProduct);
    priceInvit.value = newPriceInvit;

    return { currentPrice: currentPrice, newPrice: newPriceInvit };
  }

  addPriceInvitationTotalPriceEvent(obj, invitationPriceObj) {
    let priceEvent = this.dynamicFormGroup.controls.myEvents['controls'][obj.event_index].controls.price;
    let newPriceEvent = parseFloat(priceEvent.value) > 0 ? ((parseFloat(priceEvent.value) - invitationPriceObj.currentPrice) + invitationPriceObj.newPrice) : (parseFloat(priceEvent.value) + invitationPriceObj.newPrice);
    priceEvent.value = newPriceEvent;

    return newPriceEvent;
  }

  howManyProductsPerCategory(invitProducts, idCategory) {
    let count = 0;
    let products = [];

    invitProducts.map((el) => {
      if (el.id_category === idCategory) {
        products.push(el);
        count++;
      }
    });

    return { count: count, products: products };
  }

  getConfigPerCategory(configProducts, idCategory) {
    let config;

    configProducts.map((el) => {
      if (el.id_category === idCategory) {
        config = el;
      }
    });

    return config;
  }

  checkMaxProductCategoryInvitation(obj) {
    const formArrayProduct = this.dynamicFormGroup.controls.myEvents['controls'][obj.event_index].controls.invites.controls[obj.invit].controls[obj.attribute];
    const configProducts = this.dynamicFormGroup.controls.myEvents['controls'][obj.event_index].controls.config_products;
    const configPerCategory = this.getConfigPerCategory(configProducts.value, obj.product.id_category);
    const howManyProductsPerCategory = this.howManyProductsPerCategory(formArrayProduct.value, obj.product.id_category);

    if (howManyProductsPerCategory.count < configPerCategory.max_product) {
      return { config_category: configPerCategory, products: howManyProductsPerCategory.products, status: false };
    }

    return { config_category: configPerCategory, products: howManyProductsPerCategory.products, status: true };
  }

  insertNewProductInvatation(formArrayProduct, obj) {
    formArrayProduct.push(this.makeSubObject(obj.product));
    const invitationPriceObj = this.addProductPriceTotalInvitationPrice(obj);
    const newPriceEvent = this.addPriceInvitationTotalPriceEvent(obj, invitationPriceObj)

    this.changeValueSessionObj({ event_id: obj.event_id, invit: obj.invit, value: obj.product }, 'add', newPriceEvent, invitationPriceObj.newPrice, obj.attribute);
  }

  getProductForRemove(obj, arrayProduct) {
    let product;

    arrayProduct.map((el) => {
      product = el;
    });

    return {
      event_id: obj.event_id,
      event_index: obj.event_index,
      invit: obj.invit,
      action: 'remove',
      product: product,
      attribute: obj.attribute
    };
  }

  runRulesByCategory(formArrayProduct, obj, objChecked) {
    if (objChecked.config_category.max_product === 1) {
      let objProductRemove = this.getProductForRemove(obj, objChecked.products)
      this.removeProductInvitation(objProductRemove);
      this.insertNewProductInvatation(formArrayProduct, obj);
      // ATENÇÂO: -> EMITIR EVENTO PARA TIRAR O CHECKED DO PRODUTO REMOVIDO
    } else {
      // ENVIA MENSAGEM PENDINDO PARA TIRAR A SELEÇÂO DE UM OBJETO DA CATEGORIA
      // AJUSTAR MENSAGEM PARA O USUÁRIO
      // NÂO DEIXAR O CHECKBOX SER MARCADO EMITIR EVENTO
      this.Swal.fire({
        title: this.translate.instant('EVENTS.NOTFAVORITEEVENT'),
        icon: 'info'
      })
    }
  }

  addProductInInvitation(obj) {
    const formArrayProduct = this.dynamicFormGroup.controls.myEvents['controls'][obj.event_index].controls.invites.controls[obj.invit].controls[obj.attribute];
    const configProducts = this.dynamicFormGroup.controls.myEvents['controls'][obj.event_index].controls.config_products;

    if (configProducts.length > 0) {
      let objChecked = this.checkMaxProductCategoryInvitation(obj);
      if (obj.attribute === 'products' && objChecked.status) {
        this.runRulesByCategory(formArrayProduct, obj, objChecked);
      } else {
        this.insertNewProductInvatation(formArrayProduct, obj);
      }
    } else {
      this.insertNewProductInvatation(formArrayProduct, obj);
    }
  }

  subtractProductPriceTotalInvitationPrice(obj) {
    let priceInvit = this.dynamicFormGroup.controls.myEvents['controls'][obj.event_index].controls.invites.controls[obj.invit].controls.price;
    let priceProduct = obj.product.discount_amount ? (parseFloat(obj.product.price) - parseFloat(obj.product.discount_amount)) : parseFloat(obj.product.price);
    let newPriceInvit = (parseFloat(priceInvit.value) - priceProduct);
    priceInvit.value = newPriceInvit;

    return newPriceInvit;
  }

  subtractPriceInvitationTotalPriceEvent(obj) {
    let priceEvent = this.dynamicFormGroup.controls.myEvents['controls'][obj.event_index].controls.price;
    let priceProduct = obj.product.discount_amount ? (parseFloat(obj.product.price) - parseFloat(obj.product.discount_amount)) : parseFloat(obj.product.price);
    let newPriceEvent = (parseFloat(priceEvent.value) - priceProduct);
    priceEvent.value = newPriceEvent;

    return newPriceEvent;
  }

  removeProductInvitation(obj) {
    const formArray = this.dynamicFormGroup.controls.myEvents['controls'][obj.event_index].controls.invites.controls[obj.invit].controls[obj.attribute];
    const newPriceInvit = this.subtractProductPriceTotalInvitationPrice(obj);
    const newPriceEvent = this.subtractPriceInvitationTotalPriceEvent(obj);
    const indexProductRemove = this.changeValueSessionObj({ event_id: obj.event_id, invit: obj.invit, value: obj.product }, 'remove', newPriceEvent, newPriceInvit, obj.attribute);
    formArray.removeAt(indexProductRemove);
  }

  actionProduct(obj) {
    if (obj.action === 'add') {
      this.addProductInInvitation(obj);
      this.snackBar.open('Produto adicionado com sucesso!', 'action', {
        duration: 2000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: 'success'
      });
    } else {
      this.removeProductInvitation(obj);
      this.snackBar.open('Produto removido com sucesso!', 'action', {
        duration: 2000, verticalPosition: 'top', horizontalPosition: 'end'
      });
    }
  }

  actionOptionalProduct(obj) {
    if (obj.action === 'add') {
      this.addProductInInvitation(obj);
      this.snackBar.open('Produto adicionado com sucesso!', 'action', {
        duration: 2000, verticalPosition: 'top', horizontalPosition: 'end', panelClass: 'success'
      });
    } else {
      this.removeProductInvitation(obj);
      this.snackBar.open('Produto removido com sucesso!', 'action', {
        duration: 2000, verticalPosition: 'top', horizontalPosition: 'end'
      });
    }
  }

}
