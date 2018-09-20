import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/**
 * Provider de utilização do loader.
 */
@Injectable()
export class LoaderProvider {

  static loader : any;
  static ativo : boolean = false;

  constructor(public loadingCtrl: LoadingController) {
    
  }

  /**
   * Exibe loader de carregamento.
   * 
   */
  loaderCarregando() {
    if (!LoaderProvider.ativo) {
      LoaderProvider.loader = this.loadingCtrl.create({
          content: "Carregando...",
      });
      LoaderProvider.loader.present();
      LoaderProvider.ativo = true;
    }
  }

  /**
   * Exibe loader de aguardando.
   */
  loaderAguarde() {
    if (!LoaderProvider.ativo) {
      LoaderProvider.loader = this.loadingCtrl.create({
        content: "Aguarde...",
      });
      LoaderProvider.loader.present();
      LoaderProvider.ativo = true;
    }
  }

  /**
   * Fecha o loader. 
   */
  encerrar() {
    if (LoaderProvider.ativo) {
      LoaderProvider.loader.dismiss();
      LoaderProvider.ativo = false;
    }
  }
}