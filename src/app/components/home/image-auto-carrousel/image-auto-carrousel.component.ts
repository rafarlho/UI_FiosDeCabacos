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
    'assets/images/home/istockphoto-868117874-612x612.jpg',
    'assets/images/home/istockphoto-1331057237-612x612.jpg',
    'assets/images/home/istockphoto-1492185164-612x612.jpg'
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
    autoplayTimeout: 5000, 
    autoplayHoverPause: true

    }
  }
