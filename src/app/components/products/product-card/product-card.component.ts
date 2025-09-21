import { Component, inject, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Product } from '../../../models/product.model';
import { CartStore } from '../../../store/cart.store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ImageSliderComponent } from "../../../common/image-slider/image-slider.component";

@Component({
  selector: 'app-product-card',
  imports: [
    NzAvatarModule,
    NzCardModule,
    NzIconModule,
    ImageSliderComponent
],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>()
  index = input.required<number>()

  private message = inject(NzMessageService)


  readonly cartStore = inject(CartStore)

  addToCart() {
    this.cartStore.addProduct(this.product())
    this.message.success("Item adicionado ao carrinho!",{nzDuration: 5000})
  }
}
