import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, retry } from 'rxjs/operators';

import { LoaderProvider } from '../loader/loader';
import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session';
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor( private http: HttpClient, public loader: LoaderProvider ) { }
 
  token  = UsuarioSessionProvider.usarioSesion != undefined ? UsuarioSessionProvider.usarioSesion.token : undefined;
    
  get(url: string) {
        return this.watch(this.http.get<any>(url, {headers : { token : this.token}}));
    }
    
    /**
     * Realiza do download de algum arquivo.
     * 
     * @param url 
     */
    downloadFile(url: string) { 
      this.loader.loaderAguarde(); 
        this.http.get(url, { responseType: 'blob' }).subscribe(
            data => {
              this.loader.encerrar(); 
              var file = new Blob([data], {type: 'application/pdf'});
              var fileURL = URL.createObjectURL(file);
              window.open(fileURL);
            },
            e => { this.loader.encerrar(); } 
          );
    }
    
    post(url: string, data) {
      return this.watch(this.http.post<any>(url, {headers : { token : this.token}}, data ));
    }
     
    //fazer também para o post, put, delete ...
    private watch(response: Observable<any>) {
      this.loader.loaderAguarde();

        return response.pipe(
           retry(2),
            tap(
              data => this.loader.encerrar(),
              error => this.loader.encerrar()
            ),
        );    
    }
}
