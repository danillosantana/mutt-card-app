import { Injectable } from '@angular/core';
import { HttpProvider } from '../http/http';

// import { API } from '../../app/util/API';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  constructor(public http: HttpProvider) {
    
  }

  /**
   * Realiza o login do usuário.
   * 
   * @param usuario 
   */
  login(usuario) {
    return this.http.post('http://192.168.0.13:8080/mutt-card-web/usuario/login', usuario);
  }

  /**
   * Realiza o login do usuário.
   * 
   * @param usuario 
   */
  salvar(usuario) {
    return this.http.post('http://192.168.0.13:8080/mutt-card-web/usuario/salvar', usuario);
  }

}

