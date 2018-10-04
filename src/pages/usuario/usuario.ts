import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session';
import { MensagensProvider } from '../../providers/mensagens/mensagens';
import { LoaderProvider } from '../../providers/loader/loader';

import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the UsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usuario',
  templateUrl: 'usuario.html',
})
export class UsuarioPage {

  usuario : any = {};
  usuarioForm : any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public usuarioProvider : UsuarioProvider, public usuarioSession : UsuarioSessionProvider,
              public mensagens : MensagensProvider, public loader : LoaderProvider) {
     this.inicializarLoginForm();            
  }

  /**
   * Inicializa as propriedades para manipulação do formulário
   */
  public inicializarLoginForm() {
    this.usuario.pessoa = {};
    
    this.usuarioForm = new FormGroup({
      txtNome: new FormControl(this.usuario.nome,[Validators.required, Validators.maxLength(100)]),
      txtTelefone: new FormControl(this.usuario.telefone,[Validators.required, Validators.minLength(10), Validators.maxLength(11)]),
      txtSenha : new FormControl(this.usuario.senha, [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(10), Validators.minLength(6)]),
      txtConfirmacaoSenha : new FormControl(this.usuario.senha, [Validators.required, Validators.maxLength(10), Validators.minLength(6)])
    });
  }
  
  /**
   * Retorna para a página de login.
   */
  public cancelar() {
    this.navCtrl.push(LoginPage);
  }

  /**
   *  Salva o usuário.
   */
  public salvar() {
    this.loader.loaderAguarde();
    this.usuarioProvider.salvar(this.usuario)
    .subscribe(
      res => {
      this.loader.encerrar();
      this.usuarioSession.salvar(res)
      .then(() => {
        this.usuarioSession.inicializarUsuarioSession()
        .then( () => {
          this.navCtrl.push(TabsPage);
        })
        .catch(e => {
          this.mensagens.adicionarMensagemErro(e);
        });
      })
      .catch( e => {
        this.mensagens.adicionarMensagemErro(e)
      })
    },
    err => {
      this.loader.encerrar();
        this.mensagens.adicionarMensagemHttpErro(err);
      }
    )
  }
}
