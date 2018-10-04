import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

import { API } from '../../config/app-config'
/*
  Generated class for the CartaoFidelidadeEmpresaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartaoFidelidadeEmpresaProvider {

  constructor(public http: HttpProvider) {
    
  }

  /**
	 * Retorna a lista de cartaoFidelidadeTO.
	 * 
	 * @return idRegistro
	 */
	public getCartoesFidelidadeTOPorRegistro(idRegistro) { 
		return this.http.get(API+'cartaoFidelidade/getCartoesFidelidadeTOPorRegistro'+idRegistro);
	}

	/**
	 * Salva o cartão fidelidade.
	 */
	public salvar(cartaoFidelidade) { 
		return this.http.post(API+'cartaoFidelidade/salvar', cartaoFidelidade);
  }
}
