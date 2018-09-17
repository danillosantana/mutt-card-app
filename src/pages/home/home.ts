import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public usuario : any;

  constructor(public navCtrl: NavController, public usuarioSessionProvider : UsuarioSessionProvider) {
    this.usuario = UsuarioSessionProvider.usarioSesion;
    console.log('usuario', this.usuario);
  }



}
