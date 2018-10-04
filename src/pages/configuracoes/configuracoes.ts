import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MinhaEmpresaPage } from '../minha-empresa/minha-empresa';
import { CartaoFidelidadeEmpresaPage } from '../cartao-fidelidade-empresa/cartao-fidelidade-empresa';

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
  showMinhaEmpresa() {
    this.navCtrl.push(MinhaEmpresaPage);
  }

  /**
   * Navega para a página 'Cartoes Minha Empresa'.
   */
  showCartaoMinhaEmpresa() {
    this.navCtrl.push(CartaoFidelidadeEmpresaPage);
  }
}
