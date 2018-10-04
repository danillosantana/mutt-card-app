import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { LoaderProvider } from '../../providers/loader/loader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session';

import { TabsPage } from '../tabs/tabs';
import { MensagensProvider } from '../../providers/mensagens/mensagens';
import { UsuarioPage } from '../usuario/usuario';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario : any = {};
  loginForm : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public usuarioProvider : UsuarioProvider, public usuarioSession : UsuarioSessionProvider,
              private mensagens: MensagensProvider, public loader : LoaderProvider) {
    this.inicializarLoginForm();
  }

    /**
   * Inicializa as propriedades para manipulação do formulário
   */
  inicializarLoginForm() {
    this.loginForm = new FormGroup({
      txtTelefone: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
      txtSenha : new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(6)])
    });
  }

  /**
   * Realiza o login.
   */
  login() {
    this.loader.loaderAguarde();
    this.usuarioProvider.login(this.usuario)
    .subscribe(
      res => {
      this.usuarioSession.salvar(res)
      .then(() => {
        this.loader.encerrar();
        this.usuarioSession.inicializarUsuarioSession()
        .then( () => {
          this.navCtrl.push(TabsPage);
        })
        .catch(e => {
          this.mensagens.adicionarMensagemErro(e);
        });
      })
      .catch( e => this.mensagens.adicionarMensagemErro(e))
    },
    err => {
        this.loader.encerrar();
        this.mensagens.adicionarMensagemHttpErro(err);
      }
    )
  }

  /**
   * Redireciona para a página de cadastro de novo usuário.
   */
  novoUsuario() {
    this.navCtrl.push(UsuarioPage);
  }
}
