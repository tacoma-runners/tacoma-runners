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

  videos: any = [
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/tacoma-downtown-1080.mp4'}
  ]

  images: any = [
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/sweater-run.jpg'},
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/halloween-slide.jpeg'},
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/saturday-slide.jpeg'},
    {src: 'https://rgugzhoywaloltmagelp.supabase.co/storage/v1/object/public/photos/oktoberfest-slide.jpeg'},
  ];

  constructor() {

  }

  ngAfterViewInit(): void {
    const swiper = new Swiper(this.swiperContainer.nativeElement, {
      modules: [Navigation, Autoplay, Pagination],
      direction: 'horizontal',
      autoplay: {
        delay: 20000,
        
      },
      slidesPerView: 1,
      centeredSlides: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      speed: 700,
      
      on: {
        transitionStart: () => {
          const videos = document.querySelectorAll('video');
          Array.prototype.forEach.call(videos, function(video){
            video.pause();
          });
        },

        transitionEnd: function() {
          const activeIndex = this.activeIndex;
          const activeSlide = document.getElementsByClassName('swiper-slide')[activeIndex];
          const activeSlideVideo = activeSlide.getElementsByTagName('video')[0];
          if (activeSlideVideo) {
            activeSlideVideo.muted = true; // even though this is in html it's needed here... weird
            activeSlideVideo.playsInline = true;
            activeSlideVideo.play();
          }
        },
      }
    });
  }
}
