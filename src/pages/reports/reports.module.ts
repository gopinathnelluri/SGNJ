import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReportsPage } from './reports';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ReportsPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(ReportsPage),
  ],
})
export class ReportsPageModule {}
