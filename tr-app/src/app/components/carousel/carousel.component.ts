import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
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

  images: any = [
    {src:'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/slide1.jpg?t=2024-03-06T21%3A29%3A17.021Z'},
    {src:'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/slide2.jpg?t=2024-03-06T21%3A29%3A30.111Z'},
    {src:'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/slide3.jpg?t=2024-03-06T21%3A29%3A40.414Z'},
    {src:'https://tacomarunners.store/images/slide1.jpg'},
    {src:'https://tacomarunners.store/images/slide2.jpg'},
    {src:'https://tacomarunners.store/images/slide3.jpg'},
    {src:'https://tacomarunners.store/images/slide4.jpg'},
    {src:'https://tacomarunners.store/images/slide5.jpg'},
    {src:'https://tacomarunners.store/images/slide6.jpg'},
    {src:'https://tacomarunners.store/images/slide7.jpg'},
    {src:'https://tacomarunners.store/images/slide8.jpg'},
    {src:'https://tacomarunners.store/images/slide9.jpg'},
  ];

  constructor() {

  }

  ngAfterViewInit(): void {
    new Swiper(this.swiperContainer.nativeElement, {
      modules: [Navigation, Autoplay, Pagination],
      direction: 'horizontal',
      autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true
      },
      slidesPerView: 1,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      }
    });
  }
}
