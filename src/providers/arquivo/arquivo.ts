import { Injectable } from '@angular/core';
import { HttpProvider } from '../../providers/http/http';

import {API} from '../../config/app-config';

/**
 * Provider responsável por fornecer os serviços do arquivo.
 */
@Injectable()
export class ArquivoProvider {

  constructor(public http: HttpProvider) {
   
  }

  /**
	 * Retorna uma string base64 de um arquivo associado ao registro.
	 */
	public getBase64ArquivoPorRegistro(idRegistro) {
		return this.http.get(API+'registro/getBase64ArquivoPorRegistro/'+idRegistro);
	}
}
