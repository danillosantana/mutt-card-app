import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusCartoesPage } from './meus-cartoes';

@NgModule({
  declarations: [
    MeusCartoesPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusCartoesPage),
  ],
})
export class MeusCartoesPageModule {}
