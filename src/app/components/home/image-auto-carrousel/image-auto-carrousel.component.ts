import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-image-auto-carrousel',
  imports: [
    CarouselModule
  ],
  templateUrl: './image-auto-carrousel.component.html',
  styleUrl: './image-auto-carrousel.component.scss'
})
export class ImageAutoCarrouselComponent {

    imagePaths: string[] = [
    'assets/images/products/lion1.jpg',
    'assets/images/products/turtlem1.jpg',
    'assets/images/products/babykit.jpg',
    'assets/images/products/top1.jpg',
    'assets/images/products/bunnyBaby1.jpg',
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      
    },
    nav: false,
    autoplay: true,
    autoplayTimeout: 2500, 
    autoplayHoverPause: true

    }
  }
