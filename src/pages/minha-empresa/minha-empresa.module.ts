import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MinhaEmpresaPage } from './minha-empresa';

@NgModule({
  declarations: [
    MinhaEmpresaPage,
  ],
  imports: [
    IonicPageModule.forChild(MinhaEmpresaPage),
  ],
})
export class MinhaEmpresaPageModule {}
