import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

/**
 * Provider de utilização do loader.
 */
@Injectable()
export class LoaderProvider {

  static loader : any;
  // static ativo : boolean = false;
  static cont : number = 0;

  constructor(public loadingCtrl: LoadingController) {
    
  }

  /**
   * Exibe loader de carregamento.
   * 
   */
  loaderCarregando() {
    if (LoaderProvider.cont == 0) {
      LoaderProvider.loader = this.loadingCtrl.create({
          content: "Carregando...",
      });
      LoaderProvider.loader.present();
      
    } 

    LoaderProvider.cont++;
  }

  /**
   * Exibe loader de aguardando.
   */
  loaderAguarde() {
    if (LoaderProvider.cont == 0) {
      LoaderProvider.loader = this.loadingCtrl.create({
        content: "Aguarde...",
      });
      LoaderProvider.loader.present();
    }

    LoaderProvider.cont++;
  }

  /**
   * Fecha o loader. 
   */
  encerrar() {
    LoaderProvider.cont--;
    if (LoaderProvider.cont <= 0) {
      LoaderProvider.loader.dismiss();
      LoaderProvider.cont = 0;
    }
  }
}