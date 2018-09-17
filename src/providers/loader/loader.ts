import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/**
 * Provider de utilização do loader.
 */
@Injectable()
export class LoaderProvider {

  private loader : any;

  constructor(public loadingCtrl: LoadingController) {
    
  }

  /**
   * Exibe loader de carregamento.
   * 
   */
  loaderCarregando() {
    this.loader = this.loadingCtrl.create({
        content: "Carregando...",
    });
    this.loader.present();
  }

  /**
   * Exibe loader de aguardando.
   */
  loaderAguarde() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde...",
    });
    this.loader.present();
  }

  /**
   * Fecha o loader. 
   */
  encerrar() {
    this.loader.dismiss();
  }
}