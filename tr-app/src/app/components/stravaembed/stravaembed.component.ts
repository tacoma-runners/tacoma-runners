import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'app-stravaembed',
  standalone: true,
  imports: [],
  templateUrl: './stravaembed.component.html',
  styleUrl: './stravaembed.component.css'
})
export class StravaembedComponent implements AfterViewInit {
  @Input() routeid!: string;

  private window: Window;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
  }

  ngAfterViewInit(): void {
    if (this.window && this.window['__STRAVA_EMBED_BOOTSTRAP__']) {
      this.window['__STRAVA_EMBED_BOOTSTRAP__']();
    }
  }
}
