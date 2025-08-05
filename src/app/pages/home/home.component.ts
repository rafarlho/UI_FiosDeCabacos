import { Component } from '@angular/core';
import { ImageAutoCarrouselComponent } from "../../image-auto-carrousel/image-auto-carrousel.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    ImageAutoCarrouselComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
