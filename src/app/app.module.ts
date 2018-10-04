import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BrMaskerModule } from 'brmasker-ionic-3';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { MeusCartoesPage } from '../pages/meus-cartoes/meus-cartoes';
import { ContactPage } from '../pages/contact/contact';
import { InicioPage } from '../pages/inicio/inicio';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage  } from '../pages/login/login';
import { UsuarioPage } from '../pages/usuario/usuario';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { MinhaEmpresaPage } from '../pages/minha-empresa/minha-empresa';
import { CartaoFidelidadeEmpresaPage } from '../pages/cartao-fidelidade-empresa/cartao-fidelidade-empresa'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';

import { DatabaseProvider } from '../providers/database/database';
import { UsuarioSessionProvider } from '../providers/usuario-session/usuario-session';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpProvider } from '../providers/http/http';
import { MensagensProvider } from '../providers/mensagens/mensagens';
import { LoaderProvider } from '../providers/loader/loader';
import { EmpresaProvider } from '../providers/empresa/empresa';
import { AcaoSistemaProvider } from '../providers/acao-sistema/acao-sistema';
import { ArquivoProvider } from '../providers/arquivo/arquivo';
import { CartaoFidelidadeEmpresaProvider } from '../providers/cartao-fidelidade-empresa/cartao-fidelidade-empresa';

@NgModule({
  declarations: [
    MyApp,
    MeusCartoesPage,
    ContactPage,
    InicioPage,
    TabsPage,
    LoginPage,
    UsuarioPage,
    ConfiguracoesPage,
    MinhaEmpresaPage,
    CartaoFidelidadeEmpresaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    BrMaskerModule,
  ],
  exports : [
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MeusCartoesPage,
    ContactPage,
    InicioPage,
    TabsPage,
    LoginPage,
    UsuarioPage,
    ConfiguracoesPage,
    MinhaEmpresaPage,
    CartaoFidelidadeEmpresaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    UsuarioSessionProvider,
    UsuarioProvider,
    HttpProvider,
    MensagensProvider,
    LoaderProvider,
    EmpresaProvider,
    AcaoSistemaProvider,
    BrMaskerModule,
    File,
    Camera,
    ArquivoProvider,
    CartaoFidelidadeEmpresaProvider,
    CartaoFidelidadeEmpresaProvider
  ]
})
export class AppModule {}
