import { Component } from '@angular/core';
import { InstagramembedComponent } from '../instagramembed/instagramembed.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [InstagramembedComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
