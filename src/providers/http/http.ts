import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingController } from 'ionic-angular';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  constructor( private http: HttpClient, public loadingCtrl: LoadingController ) { }
 
    get(url: string) {
        return this.watch(this.http.get<any>(url));
    }
    
    /**
     * Realiza do download de algum arquivo.
     * 
     * @param url 
     */
    downloadFile(url: string) { 
      const loader = this.loadingCtrl.create({
        content: "Aguarde...",
        });
      loader.present();
        this.http.get(url, { responseType: 'blob' }).subscribe(
            data => {
              loader.dismiss(); 
              var file = new Blob([data], {type: 'application/pdf'});
              var fileURL = URL.createObjectURL(file);
              window.open(fileURL);
            },
            e => { loader.dismiss(); } 
          );
    }
    
    post(url: string, data) {
      return this.watch(this.http.post<any>(url, data));
    }
     
    //fazer também para o post, put, delete ...
    private watch(response: Observable<any>) {
      const loader = this.loadingCtrl.create({
        content: "Aguarde...",
      });
      
      loader.present();

        return response.pipe(
            tap(
              data => loader.dismiss(),
              error => loader.dismiss()
            ),
        );    
    }
}
