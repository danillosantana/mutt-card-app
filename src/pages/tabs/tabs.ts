import { Component } from '@angular/core';

import { MeusCartoesPage } from '../meus-cartoes/meus-cartoes';
import { ConfiguracoesPage } from '../configuracoes/configuracoes';
import { InicioPage } from '../inicio/inicio';

import { UsuarioSessionProvider } from '../../providers/usuario-session/usuario-session'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InicioPage;
  tab2Root = MeusCartoesPage;
  tab3Root = ConfiguracoesPage;

  constructor(public usuarioSessionProvider : UsuarioSessionProvider) {

  }
}
