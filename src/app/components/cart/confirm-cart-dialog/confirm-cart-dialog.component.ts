import { Component, computed, inject, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonModule } from '@angular/common';
import { CartStore } from '../../../store/cart.store';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { finalize, take } from 'rxjs';
import emailjs from 'emailjs-com';
import { environment } from '../../../../environments/environment';

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

  loading = signal(false)
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
  private http = inject(HttpClient)
  cancelModal(): void {
    this.modalRef.close();
  }

  saveUser(): void {
    if (!this.user.firstName || !this.user.lastName || !this.user.email) {
      this.message.warning('Por favor, preencha todos os campos.');
      return;
    }

    this.loading.set(true);

    const itemsList = this.cartStore.selectedItems().map((item, index) => {
      const name = item.product.name;
      const price = item.product.price?.toFixed(2) || '0.00';
      return `${index + 1}. ${name} — Quantidade: ${item.quantity}, Preço unitário: €${price}`;
    }).join('\n');

    const templateParamsClient = {
      to_name: this.user.firstName + ' ' + this.user.lastName,
      totalItems: this.totalItems(),
      totalPrice: this.totalPrice().toFixed(2),
      itemsList: itemsList,
      email: this.user.email
    };

    const templateParamsNotify = {
      to_name: 'Fios De Cabaços',
      totalItems: this.totalItems(),
      totalPrice: this.totalPrice().toFixed(2),
      itemsList: itemsList,
      email: this.user.email
    };

    emailjs.send(environment.emailJsServiceId, environment.emailJsTemplateClient, templateParamsClient, environment.emailJsClientId)
      .then(() => {
        this.message.success('Encomenda feita com sucesso! Em breve receberá um email com os detalhes.', { nzDuration: 5000 });
        this.cartStore.clearStore();
        this.modalRef.close();
      })
      .catch(() => {
        this.message.error('Não foi possível fazer a encomenda... Por favor tente mais tarde.', { nzDuration: 5000 });
      })
      .finally(() => {
        this.loading.set(false);
      });
  }
}
