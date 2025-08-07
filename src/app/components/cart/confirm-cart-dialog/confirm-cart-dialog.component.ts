import { Component, computed, inject, input, Input, signal, Signal } from '@angular/core';
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
import { products } from '../../products/products-config';

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
    if (this.user.firstName && this.user.lastName && this.user.email) {
      this.loading.set(true)
      this.http.post('https://api-fiosdecabacos.onrender.com/send-email', {
        to: this.user.email,
        fullName: this.user.firstName + ' ' + this.user.lastName,
        totalPrice: this.totalPrice(),
        totalItems: this.totalItems(),
        items: this.cartStore.selectedItems()
      }).pipe(
        take(1),
        finalize(()=> {
          this.loading.set(false)
        })
      ).subscribe({
        next:()  => {
          this.message.success('Encomenda feita com sucesso! Em breve receberá um email com os detalhes.', {nzDuration:10000});
          this.cartStore.clearStore()
          this.modalRef.close()
        },
        error: ()=> {
          this.message.error('Não foi possível fazer a encomenda... Por favor tente mais tarde ou valide os campos inseridos.', {nzDuration:10000});
        }
      })
      
    } else {
      this.message.warning('Por favor, preencha todos os campos.');
    }
  }
  sendEmail(userEmail: string) {
    return this.http.post('https://api-fiosdecabacos.onrender.com/send-email', {
      to: userEmail
    });
  }
}
