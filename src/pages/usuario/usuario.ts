import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';
import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session';
import { MensagensProvider } from '../../providers/mensagens/mensagens';
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
              public mensagens : MensagensProvider) {
     this.inicializarLoginForm();            
  }

  /**
   * Inicializa as propriedades para manipulação do formulário
   */
  public inicializarLoginForm() {
    this.usuario.pessoa = {};
    
    this.usuarioForm = new FormGroup({
      txtNome: new FormControl(this.usuario.nome,[Validators.required, Validators.maxLength(100)]),
      txtEmail: new FormControl(this.usuario.email,[Validators.required, Validators.maxLength(100)]),
      txtSenha : new FormControl(this.usuario.senha, [Validators.required, Validators.maxLength(10), Validators.minLength(6)]),
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
    this.usuarioProvider.salvar(this.usuario)
    .subscribe(
      res => {
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
        this.mensagens.adicionarMensagemErro(err.error);
      }
    )
  }
}
