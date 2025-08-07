import { Component, inject, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Product } from '../../../models/product.model';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartStore } from '../../../store/cart.store';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-product-card',
  imports: [
    NzAvatarModule, 
    NzCardModule, 
    NzIconModule,
    CarouselModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>()
  index = input.required<number>()

  private message = inject(NzMessageService)

  carouselOptions: OwlOptions = {
    loop: true,
    items: 1,
    dots: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  };  

  readonly cartStore = inject(CartStore)

  addToCart() {
    this.cartStore.addProduct(this.product())
    this.message.success("Item adicionado ao carrinho!",{nzDuration: 5000})
  }
}
