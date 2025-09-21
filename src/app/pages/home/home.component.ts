import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageSliderComponent } from "../../common/image-slider/image-slider.component";

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ImageSliderComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  slides = [
    'assets/images/products/lion1.jpg',
    'assets/images/products/turtlem1.jpg',
    'assets/images/products/babykit.jpg',
    'assets/images/products/top1.jpg',
    'assets/images/products/bunnyBaby1.jpg',
  ]
}
