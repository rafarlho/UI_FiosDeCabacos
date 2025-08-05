import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAutoCarrouselComponent } from './image-auto-carrousel.component';

describe('ImageAutoCarrouselComponent', () => {
  let component: ImageAutoCarrouselComponent;
  let fixture: ComponentFixture<ImageAutoCarrouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageAutoCarrouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAutoCarrouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
