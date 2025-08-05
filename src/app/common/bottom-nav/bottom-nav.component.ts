import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzIconModule, NzIconService } from 'ng-zorro-antd/icon';
import { HomeOutline, AppstoreOutline, ShoppingCartOutline } from '@ant-design/icons-angular/icons';
@Component({
  selector: 'app-bottom-nav',
  imports: [
    RouterLink,
    RouterLinkActive,
    NzIconModule
  ],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent {
  private iconService = inject(NzIconService)
  
  constructor() {
    this.iconService.addIcon(HomeOutline,AppstoreOutline,ShoppingCartOutline)
  }

  config = [
    {
      routerLink: '/home',
      icon: 'home',
      label: 'Início'
    },
    {
      routerLink: '/products',
      icon: 'appstore',
      label: 'Produtos'
    },
    {
      routerLink: '/cart',
      icon: 'shopping-cart',
      label: 'Carrinho'
    },
  ]
}
