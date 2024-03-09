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
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/halloween-slide.jpeg'},
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/flannel-slide.jpeg'},
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/oktoberfest-slide.jpeg'},
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/saturday-slide.jpeg'},
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/narrows-slide.jpg'},
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
      },
      loop: true,
    });
  }
}
