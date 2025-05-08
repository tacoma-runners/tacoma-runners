import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  public openDonate() {
    window.open('https://donate.stripe.com/00gfZwglU4X225O6ox');
  }

  public openTrainingForm() {
    window.open('https://forms.gle/SaiwDVc8Pm9McZSn9');
  }
}
