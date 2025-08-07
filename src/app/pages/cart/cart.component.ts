import { Component, computed, inject, Signal, WritableSignal } from '@angular/core';
import { CartStore } from '../../store/cart.store';
import { CartItem } from '../../models/cart-item.model';
import { NzButtonModule, NzButtonSize } from 'ng-zorro-antd/button';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { PlusOutline, MinusOutline} from '@ant-design/icons-angular/icons';
import { NzModalModule,NzModalService } from 'ng-zorro-antd/modal';
import { ConfirmCartDialogComponent } from '../../components/cart/confirm-cart-dialog/confirm-cart-dialog.component';

enum Operation {ADD, SUBTRACT} 

@Component({
  selector: 'app-cart',
  imports: [
    NzButtonModule,
    NzIconModule,
    NzModalModule 
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  readonly cartStore = inject(CartStore)

  readonly subtract = Operation.SUBTRACT
  readonly add = Operation.ADD

  cartStoreItems : Signal<CartItem[]> = computed(()=> this.cartStore.selectedItems())
  private modalService = inject(NzModalService);

  private iconService = inject(NzIconService)
    
  constructor() {
    this.iconService.addIcon(PlusOutline, MinusOutline)
  }

  updateQuantity(cartItemToEdit:CartItem,operation: Operation) {
    switch(operation) {
      case Operation.ADD: this.cartStore.updateQuantity(cartItemToEdit, ++cartItemToEdit.quantity)
        return 
      case Operation.SUBTRACT: this.cartStore.updateQuantity(cartItemToEdit, --cartItemToEdit.quantity)
        return
    }
  } 

  openUserInfoModal(): void {
    const modalRef = this.modalService.create<ConfirmCartDialogComponent>({
      nzContent: ConfirmCartDialogComponent,
        nzFooter: null,
        nzMaskClosable: false, 
        nzClosable: false,  
    });

  }
}
