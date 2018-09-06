import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
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
              private mensagens: MensagensProvider) {
    this.inicializarLoginForm();
  }

    /**
   * Inicializa as propriedades para manipulação do formulário
   */
  inicializarLoginForm() {
    this.loginForm = new FormGroup({
      txtLogin: new FormControl(this.usuario.email,[Validators.required, Validators.maxLength(100)]),
      txtSenha : new FormControl(this.usuario.senha, [Validators.required, Validators.maxLength(10), Validators.minLength(6)])
    });
  }

  /**
   * Realiza o login.
   */
  login() {
    this.usuarioProvider.login(this.usuario)
    .subscribe(
      res => {
      this.usuarioSession.salvar(res)
      .then(() => {
        this.navCtrl.push(TabsPage);
      })
      .catch( e => this.mensagens.adicionarMensagemErro(e.error))
    },
    err => {
        this.mensagens.adicionarMensagemErro(err.error);
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
