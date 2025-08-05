import { Component, input } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { Product } from '../../../models/product.model';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
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

  carouselOptions: OwlOptions = {
    loop: true,
    items: 1,
    dots: true,
    nav: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true
  };

  addToCart() {
    console.log('Add to cart', this.product());
  }
}
