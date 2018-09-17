import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

import { API } from '../../config/app-config'
import { Thumbnail } from '../../../node_modules/ionic-angular/umd';

/**
 * Provider responsável por fornecer os serviços da empresa.
 */
@Injectable()
export class EmpresaProvider {

  constructor(public http: HttpProvider) {
    
  }

  /**
	 *  Salva o registro.
	 *  
	 * @param registro
	 * @param arquivo
	 */
	public salvar(registro,  arquivo) {
		return this.http.post(API+ 'registro/salvar',{registro : registro, arquivo : arquivo});
	}
	
	/**
	 * Retorna o registro associado ao responsável informado.
   * 
	 * @param idResponsavel
	 */
	public getRegistroPorResponsavel(idResponsavel) {
		return this.http.get(API+'registro/getRegistroPorResponsavel/'+idResponsavel);
	}
	
	/**
	 * Retorna a lista de categorias.
	 * 
	 * @return
	 */
	public getCategorias() {
		return this.http.get(API+'registro/getCategorias');
	}

	/**
	 * Retorna a lista de estados.
	 * 
	 * @return 
	 */
	public getEstados() {
		return this.http.get(API+'registro/getEstados');
	}

	/**
	 * Retorna a lista de Municipio associados Estado.
	 * 
	 * @param idEstado
	 */
	public getMunicipiosPorEstado(idEstado) { 
		return this.http.get(API+'registro/getMunicipiosPorEstado/'+idEstado);
	}

}
