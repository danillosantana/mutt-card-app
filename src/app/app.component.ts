import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoaderProvider } from '../providers/loader/loader';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';
import { UsuarioSessionProvider } from '../providers/usuario-session/usuario-session';
import { MensagensProvider } from '../providers/mensagens/mensagens';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              dbProvider: DatabaseProvider, usuarioSessionProvider : UsuarioSessionProvider, 
              public loader: LoaderProvider, public mensagensProvider : MensagensProvider ) {
    loader.loaderCarregando();            
    platform.ready().then(() => {
      statusBar.styleDefault();
      
      dbProvider.createDataBase()
      .then(() => {
        usuarioSessionProvider.inicializarUsuarioSession()
        .then( () => {
          splashScreen.hide();
          if (UsuarioSessionProvider.autenticado) {
            this.rootPage = TabsPage;
          } else {
            this.rootPage = LoginPage;
          }
          loader.encerrar();
        })
        .catch(e =>{
          console.log('Falha ao inicializar o usuário', e);
          mensagensProvider.adicionarMensagemErro("Falha ao inicializar o usuário.");
          } 
        );
      })  
      .catch(e => {
        console.log('Falha ao criar banco de dados', e);
        mensagensProvider.adicionarMensagemErro("Falha ao criar banco de dados.");
      })
    });
  }
}
