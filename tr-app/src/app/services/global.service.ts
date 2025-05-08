import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  public openDonate() {
    window.open('https://donate.stripe.com/00gfZwglU4X225O6ox');
  }

  public openRecurringDonate() {
    window.open('https://buy.stripe.com/7sI00y7Podty11KfZ6');
  }

  public openTrainingForm() {
    window.open('https://forms.gle/SaiwDVc8Pm9McZSn9');
  }
}
