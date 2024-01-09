import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-lb-image',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './lb-image.component.html',
  styleUrl: './lb-image.component.css',
  encapsulation: ViewEncapsulation.None
})
export class LightboxImageComponent {
  @Input() src!: string;
  @Input() label!: string;

  isModalVisible:boolean = false;

  constructor() { }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
  }
