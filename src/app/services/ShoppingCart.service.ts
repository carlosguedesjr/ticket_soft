import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TICKET_API, TICKET_API_INGRESSOS } from '../app.api';
import { cartItemResume } from '../interfaces/cartItemResume';
import { Subject } from 'rxjs';
import { JwtService } from './Jwt.service';

@Injectable()
export class ShoppingCartService {
    invites: cartItemResume[] = [];
    atShopCartCheckoutCartItems = new Subject;
    atQtdBagdeEvents = new Subject;
    pCartItems: [] = [];

    shoppingCartElementSubject = new Subject();
    
    constructor(
        private http: HttpClient,
        private jwtService: JwtService
    ) { }

    public getEventAttributes(eventId: number) {
        return this.http.get(`${TICKET_API}/attributes?event_id=${eventId}`)
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }

    public getEventProduct(eventId: number) {
        return this.http.get(`${TICKET_API}/products?event_id=${eventId}`)
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }

    public getEventOptionalProduct(eventId: number) {
        return this.http.get(`${TICKET_API}/optional_products?event_id=${eventId}`)
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }

    public getEventInviteType(eventId: number) {
        return this.http.get(`${TICKET_API_INGRESSOS}/IngressosTiposConvites/GetInviteType?event_id=${eventId}`,this.jwtService.getOptions())
            .toPromise()
            .then((res: Response) => res)
            .catch((error: Response) => error);
    }

    public clear(item: any) {
        item.invates = [];
    }

    public addItem(item: any) {
        let ticket = {
            'name': 'Nome do dono do convite',
            'birthday': '',
            'price': '0',
            'type_invite_selected': ''
        };
        if (item.max_invite > item.invites.length) {
            item.invites.push(ticket);
        }
    }

    public removeItem(item: any) {
        if (item.invites.length === 0) {
            return false;
        }
        item.invites.splice(item, 1);
    }

    public sendCartItems(cartItem) {
        this.pCartItems = cartItem;
        this.atShopCartCheckoutCartItems.next(this.pCartItems);
    }

    sendShoppingCartElementPanel(element: ElementRef) {
        this.shoppingCartElementSubject.next(element);
    }

    get refCartItems() {
        return [...this.pCartItems];
    }

    public addQtdEventsBadge(operation: string){
        this.atQtdBagdeEvents.next(operation);
    }

}