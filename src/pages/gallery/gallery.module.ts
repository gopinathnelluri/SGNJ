import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GalleryPage } from './gallery';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GalleryPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(GalleryPage),
  ],
})
export class GalleryPageModule {}
