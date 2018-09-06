import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';


/*
  Generated class for the MensagensProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MensagensProvider {

  constructor( private alertCtrl: AlertController) {
   
  }

  /**
   * Exibe mensagem de erro na tela.
   * 
   * @param msg 
   */
  public adicionarMensagemErro(msg) {
    this.criarAlerta(msg, 'Atenção');
  }

  /**
   * Exibe mensagem de sucesso na tela.
   * 
   * @param msg 
   */
  public adicionarMensagemSucesso(msg) {
    this.criarAlerta(msg, 'Sucesso');
  }

  /**
   * Cria o alerta.
   * 
   * @param msg 
   * @param title 
   */
  private criarAlerta(msg, title) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: [{
        text: 'Ok',
        role: 'Ok',
        handler: () => {}
      }]
    });
    alert.present();
  }
}
