import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchedulePage } from './schedule';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SchedulePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SchedulePage),
  ],
})
export class SchedulePageModule {}
