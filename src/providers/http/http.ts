import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { tap} from 'rxjs/operators';

import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session';


/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor( private http: HttpClient) { }
 
  httpOptions = {
    headers: new HttpHeaders({
      'token': UsuarioSessionProvider.usarioSesion.telefone != undefined && UsuarioSessionProvider.usarioSesion.token != undefined ? UsuarioSessionProvider.usarioSesion.telefone+';'+UsuarioSessionProvider.usarioSesion.token : ''
    })
  };

  get(url: string) {
      return this.watch(this.http.get<any>(url, this.httpOptions));
  }
    
    
  post(url: string, data) {
    return this.watch(this.http.post<any>(url, data, this.httpOptions));
  }
     
  private watch(response: Observable<any>) {
      return response.pipe();    
  }
}