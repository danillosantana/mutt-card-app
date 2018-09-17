import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MinhaEmpresaPage } from '../minha-empresa/minha-empresa';


/**
 * Generated class for the ConfiguracoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html',
})
export class ConfiguracoesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  /**
   * Navega para a página 'Minha Empresa'.
   */
  minhaEmpresa() {
    this.navCtrl.push(MinhaEmpresaPage);
  }
}
