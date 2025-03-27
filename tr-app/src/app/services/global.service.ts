import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  public openDonate() {
    window.open('https://donate.stripe.com/eVaaFc4DcgFK9yg8wD');
  }

  public openTrainingForm() {
    window.open('https://forms.gle/L5YsTwzbCCtWomAw5');
  }
}
