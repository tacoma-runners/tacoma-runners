import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject } from '@angular/core';

@Component({
  selector: 'app-instagramembed',
  standalone: true,
  imports: [],
  templateUrl: './instagramembed.component.html',
  styleUrl: './instagramembed.component.css'
})
export class InstagramembedComponent implements AfterViewInit {
  private window: Window;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  ngAfterViewInit(): void {
    if (this.window && this.window['instgrm']) {
      this.window['instgrm'].Embeds.process();
    }
  }

}
