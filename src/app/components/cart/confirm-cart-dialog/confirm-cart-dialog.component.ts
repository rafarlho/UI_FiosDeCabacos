import { Component, computed, inject, input, Input, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../../store/cart.store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-confirm-cart-dialog',
  imports: [
    CommonModule,
    FormsModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule
  ],
  templateUrl: './confirm-cart-dialog.component.html',
  styleUrl: './confirm-cart-dialog.component.scss'
})
export class ConfirmCartDialogComponent {

  private cartStore = inject(CartStore)
  totalItems: Signal<number> = computed(() =>
    this.cartStore.selectedItems().reduce(
      (total, item) => total + item.quantity, 
      0
    )
  );
  totalPrice: Signal<number> = computed(() =>
    this.cartStore.selectedItems().reduce(
      (total, item) => total + ((item.product.price??0) * item.quantity), 
      0 
    )
  );

  user = {
    firstName: '',
    lastName: '',
    email: ''
  };

  private modalRef = inject(NzModalRef)
  private message = inject(NzMessageService)
  cancelModal(): void {
    
    this.modalRef.close();
  }

  saveUser(): void {
    if (this.user.firstName && this.user.lastName && this.user.email) {
      
      this.modalRef.close();
    } else {
      this.message.warning('Por favor, preencha todos os campos.');
    }
  }
}
