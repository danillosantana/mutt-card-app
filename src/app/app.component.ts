import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { DatabaseProvider } from '../providers/database/database';
import { UsuarioSessionProvider } from '../providers/usuario-session/usuario-session';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              dbProvider: DatabaseProvider, usuarioSessionProvider : UsuarioSessionProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
        })
        .catch(e => console.error('Falha ao inicializar o usuário na sessão.', e));
      })  
      .catch(e => console.error('Falha ao inicializar o db.', e));
    });
  }
}
