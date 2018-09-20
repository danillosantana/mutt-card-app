import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'token': UsuarioSessionProvider.usarioSesion.token != undefined ? UsuarioSessionProvider.usarioSesion.token : ''
  })
};

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor( private http: HttpClient ) { }
 
  get(url: string) {
       let token =  UsuarioSessionProvider.usarioSesion.token != undefined ? UsuarioSessionProvider.usarioSesion.token : '';
        return this.watch(this.http.get<any>(url, {headers : { token : token}}));
    }
    
    /**
     * Realiza do download de algum arquivo.
     * 
     * @param url 
     */
    downloadFile(url: string) {  
        this.http.get(url, { responseType: 'blob' }).subscribe(
            data => { 
              var file = new Blob([data], {type: 'application/pdf'});
              var fileURL = URL.createObjectURL(file);
              window.open(fileURL);
            },
            e => { } 
          );
    }
    
    post(url: string, data) {
      let token =  UsuarioSessionProvider.usarioSesion.token != undefined ? UsuarioSessionProvider.usarioSesion.token : '';
      return this.watch(this.http.post<any>(url, data, {headers : {  
        token : token
        }
      }));
    }
     
    //fazer também para o post, put, delete ...
    private watch(response: Observable<any>) {
        return response.pipe(
           retry(2)
        );    
    }
}