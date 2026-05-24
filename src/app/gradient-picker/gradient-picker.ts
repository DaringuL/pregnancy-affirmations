import {Component, model, viewChild} from '@angular/core';
import {Menu, MenuContent, MenuItem, MenuTrigger} from '@angular/aria/menu';
import {OverlayModule} from '@angular/cdk/overlay';
import gradients from './gradients';

@Component({
  selector: 'app-gradient-picker',
  imports: [Menu, MenuContent, MenuItem, MenuTrigger, OverlayModule],
  templateUrl: './gradient-picker.html',
  styleUrl: './gradient-picker.css',
})
export class GradientPicker {
  gradientMenu = viewChild<Menu<string>>('gradientMenu');
  public gradientValue = model<string>(gradients[0].value)
  protected readonly gradients = gradients;
}
