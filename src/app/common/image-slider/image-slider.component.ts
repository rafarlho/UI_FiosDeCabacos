import { Component, effect, inject, input, signal } from '@angular/core';
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule, NzImageService } from 'ng-zorro-antd/image';
import { products } from '../../components/products/products-config';
import { filter } from 'rxjs';

@Component({
  selector: 'app-image-slider',
  imports: [
    NzIconModule,
    NzButtonModule,
    NzImageModule
  ],
  templateUrl: './image-slider.component.html',
  styleUrl: './image-slider.component.scss'
})
export class ImageSliderComponent {
  slides = input<string[]>([])
  indicatorsVisible = input<boolean>(true)
  currentSlide = signal<number>(0)
  autoPlay = input<boolean>(false)
  autoPlaySpeed = input<number>(3000)

  private nzImageService = inject(NzImageService);
  
  hidden = signal<boolean>(false)

  constructor() {
    effect(()=> {
      if(this.autoPlay()) {
        setInterval(()=> {
          this.next()
        },this.autoPlaySpeed())
      }
    })
  }

  next() {
    const nextSlide = (this.currentSlide()+1) % this.slides().length
    this.jumpToSlide(nextSlide)
  }
  
  previous() {
    const previousSlide = (this.currentSlide()-1 + this.slides().length) % this.slides().length
    this.jumpToSlide(previousSlide)
  }

  jumpToSlide(index: number) {
    this.hidden.set(true)
    setTimeout(()=> {
      this.currentSlide.set(index)
      this.hidden.set(false)
    },300)
  }


  viewImageInDetail(index:number) {
    const srcs = this.slides().filter(slide => slide != this.slides()[index]).map(slide => ({src: slide}) )
    this.nzImageService.preview([{
      src: this.slides()[index],
    }].concat(srcs),
    
  )
  }
}
