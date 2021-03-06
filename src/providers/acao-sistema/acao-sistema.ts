import { Injectable } from '@angular/core';

/*
  Generated class for the AcaoSistemaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AcaoSistemaProvider {

  constructor() {
    
  }

  private acaoVigente : string;

    /**
    * Seta a ação para alteração.
    */
    setaAcaoParaAlterar() : void {
      this.acaoVigente = acaoSistema.ALTERAR;
    }

    /**
    * Retorna que a ação do sistema é alteração. 
    */
    isAcaoSistemaAlterar() : boolean {
      return this.acaoVigente == acaoSistema.ALTERAR;
    }

    /**
    * Seta a ação para incluir.
    */
    setaAcaoParaIncluir() : void {
      this.acaoVigente = acaoSistema.INCLUIR;
    }

    /**
    * Retorna que a ação do sistema é inclusão. 
    */
    isAcaoSistemaIncluir() : boolean {
      return this.acaoVigente == acaoSistema.INCLUIR;
    }    

    /**
    * Seta a ação para listar.
    */
    setaAcaoParaListar() : void {
      this.acaoVigente = acaoSistema.LISTAR;
    }

    /**
    * Retorna que a ação do sistema é listar. 
    */
    isAcaoSistemaListar() : boolean {
      return this.acaoVigente == acaoSistema.LISTAR;
    }

    /**
    * Seta a ação para visualizar.
    */
    setaAcaoParaVisualizar() : void {
      this.acaoVigente = acaoSistema.VISUALIZAR;
    }

    /**
    * Retorna que a ação do sistema é visualizar. 
    */
    isAcaoSistemaVisualizar() : boolean {
      return this.acaoVigente == acaoSistema.VISUALIZAR;
    }

}

const acaoSistema  = {
  ALTERAR : 'ALTERAR',
  INCLUIR : 'INCLUIR',
  LISTAR : 'LISTAR',
  VISUALIZAR : 'VISUALIZAR'
};