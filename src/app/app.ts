import { Component, effect, signal } from '@angular/core';
import {AffirmationCardComponent} from './pregnancy-affirmations-card/pregnancy-affirmations-card';
import {GradientPicker} from './gradient-picker/gradient-picker';
import gradients from './gradient-picker/gradients';

const STORAGE_KEY = 'selected_gradient';

@Component({
  selector: 'app-root',
  imports: [AffirmationCardComponent, GradientPicker],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected gradientValue = signal(localStorage.getItem(STORAGE_KEY) || gradients[0].value);

  constructor() {
    effect(() => {
      localStorage.setItem(STORAGE_KEY, this.gradientValue());
    });
  }
}
