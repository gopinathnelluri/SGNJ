import { Component } from '@angular/core';
import { icons } from '../../providers/icons';

/**
 * Generated class for the MiniLoaderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'mini-loader',
  templateUrl: 'mini-loader.html'
})
export class MiniLoaderComponent {

  customIcons: any;

  constructor() {
    this.customIcons = icons;
  }

}
