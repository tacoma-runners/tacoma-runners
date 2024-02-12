import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navigation, Autoplay, Pagination, EffectCoverflow } from 'swiper/modules';
import { Swiper } from 'swiper';

import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CarouselComponent implements AfterViewInit {

  @ViewChild('swiperContainer') swiperContainer: any;

  images: string[] = [
    'http://tacomarunners.store/images/slide1.jpg',
    'http://tacomarunners.store/images/slide2.jpg',
    'http://tacomarunners.store/images/slide3.jpg',
    'http://tacomarunners.store/images/slide4.jpg',
    'http://tacomarunners.store/images/slide5.jpg',
    'http://tacomarunners.store/images/slide6.jpg',
    'http://tacomarunners.store/images/slide7.jpg',
    'http://tacomarunners.store/images/slide8.jpg',
    'http://tacomarunners.store/images/slide9.jpg',
  ];

  constructor() {

  }

  ngAfterViewInit(): void {
    new Swiper(this.swiperContainer.nativeElement, {
      modules: [Navigation, Autoplay, Pagination, EffectCoverflow],
      direction: 'horizontal',
      loop: true,
      autoplay: true,
      slidesPerView: 1,
      centeredSlides: true,
      breakpoints: {
        600: {
          slidesPerView: "auto",
        }
      },
      effect: 'coverflow',
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      }
    });
  }
}
