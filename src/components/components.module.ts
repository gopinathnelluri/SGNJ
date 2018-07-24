import { NgModule } from '@angular/core';
import { MiniLoaderComponent } from './mini-loader/mini-loader';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [MiniLoaderComponent],
	imports: [
		IonicModule.forRoot(ComponentsModule)
	],
	exports: [MiniLoaderComponent]
})
export class ComponentsModule {}
