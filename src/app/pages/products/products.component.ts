import { Component } from '@angular/core';
import { products } from '../../components/products/products-config';
import { ProductCardComponent } from "../../components/products/product-card/product-card.component";

@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = products
}
