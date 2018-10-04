import { AlertController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';


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
  public adicionarMensagemHttpErro(httpErrorResponse : HttpErrorResponse) {
    let msg = this.getMensagemErro(httpErrorResponse);
    this.criarAlerta(msg, 'Atenção');
  }

/**
   * Exibe mensagem de erro na tela.
   * 
   * @param msg 
   */
  public adicionarMensagemErro(msg : string) {
    this.criarAlerta(msg, 'Atenção');
  }

  /**
   * Retorna a mensagem de error.
   * 
   * @param httpErrorResponse 
   */
  private getMensagemErro(httpErrorResponse : HttpErrorResponse) {
    if (!httpErrorResponse.ok && httpErrorResponse.status == 0) {
      return  "Falha de conexão. Tente mais tarde."
    } else {
      return httpErrorResponse.error;
    }
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
