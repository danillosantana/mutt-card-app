import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session'

/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {

  usuario : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.usuario = UsuarioSessionProvider.usarioSesion;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioPage');
  }

}
